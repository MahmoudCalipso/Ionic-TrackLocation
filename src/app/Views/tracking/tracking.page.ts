import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { TrackingService } from 'src/app/services/tracking.service';
import { CarService } from 'src/app/services/car.service';
import { Observable, throwError } from 'rxjs';
import { CarModule } from 'src/app/modules/car/car.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationModule } from 'src/app/modules/location/location.module';
import { TrackModule } from 'src/app/modules/track/track.module';
import { catchError, map } from 'rxjs/operators';
declare var google;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  currentPageTitle = 'Tracking Location';
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  createdByUserId: number;
  UserId: number;
  times: any;
  isTracking: boolean;
  trackedRoute: any[];
  position: any;
  cars: CarModule[];
  location: LocationModule;
  tracking: TrackModule;
  submitform: FormGroup;
  locationid: number;
  carmat: number;
  constructor(
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private trackingService: TrackingService,
    private storage: Storage,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastController: ToastController

  ) {
    this.submitform = this.formBuilder.group({
    car: ['', Validators.required],
    });
  }

  ngOnInit() {
    parseInt(this.storage.getItem('USER_CREATEDBY'), this.createdByUserId);
    parseInt(this.storage.getItem('USER_ID'), this.UserId);
    this.checkAppGpsPermission();
    this.getAllCars();
    this.isTracking = false;
  }
  getAllCars() {
    return this.carService.getUserCars(this.createdByUserId).subscribe(
      data => {
        this.cars = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  checkAppGpsPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.requestToSwitchOnGPS();
        } else {
          this.askGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  askGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.requestToSwitchOnGPS();
            },
            error => {
              alert(error);
            }
          );
      }
    });
  }
  requestToSwitchOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        this.startTracking();
      },
      error => alert(JSON.stringify(error))
    );
  }

  startTracking() {
    if (!this.submitform.valid) {
      const toast =  this.toastController.create({
        message: 'You should shose car for tracking',
        duration: 2000
      });
      return;
    }
    const userid = this.storage.getItem('UserId');
    const carid = this.submitform.value();
    this.location.StartDate = new Date(Date.parse(Date()));
    this.location.CarId = carid;
    this.location.UserId = parseInt.apply(userid);
    this.trackingService.saveLocation(this.location).
      pipe(
        map((data: LocationModule) => {
          this.locationid = data.LocationId;
          return data.LocationId;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
    this.isTracking = true;
    this.trackedRoute = [];
    const mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.position = this.geolocation.getCurrentPosition( {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }).then((res) => {
      this.position.long =  res.coords.longitude;
      this.position.lat = res.coords.latitude;
      this.position.speed = res.coords.speed;
      this.position.timestamp = res.timestamp;

      // convert data to object
      this.tracking.longitude = res.coords.longitude;
      this.tracking.latitude = res.coords.latitude;
      this.tracking.speed = res.coords.speed;
      this.tracking.LocationId = this.locationid;
      this.trackingService.saveTracksForLocation(this.tracking);
      const latLng = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
      this.map.setCenter(latLng);
      this.map.setZoom(16);
      this.carService.getUserCar(this.UserId, this.location.CarId).
      pipe(
        map((car: CarModule) => {
          this.carmat = car.Matricule;
          return car;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
      google.maps.Marker({
        icon : '../../../assets/photo/driver.png',
        position: latLng,
        map: this.map,
        title: 'Driver Name : *** Car : **** speed : ****',
      });
    }).catch((err) => {
      alert('Error: ' + err);
    });
  }

  stopTracking() {
    const endDate = new Date(Date.parse(Date()));
    this.location.EndDate = endDate;
    this.isTracking = false;
    // call location service to update the finish date
    this.trackingService.updateLocation(this.locationid, this.location);

   // this.currentMapTrack.setMap(null);
}

}
