import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';
import { LocationModule } from 'src/app/modules/location/location.module';
import { TrackModule } from 'src/app/modules/track/track.module';
import { TrackingService } from 'src/app/services/tracking.service';
declare var google;

@Component({
  selector: 'app-show-track',
  templateUrl: './show-track.page.html',
  styleUrls: ['./show-track.page.scss'],
})
export class ShowTrackPage implements OnInit {
  userid: string;
  locId: string;
  track$: Observable<TrackModule>;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  position: any;
  latitude: number;
  longitude: number;


  constructor(private trackingService: TrackingService,
              private route: ActivatedRoute,
              private rouer: Router,
              private geolocation: Geolocation
            ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userid = params.get('userId');
      this.locId = params.get('locId');
    });
    this.showTrack(this.userid, this.locId);
    this.getCarInfo();
    this.getUserInfo();
  }
  getUserInfo() {
    throw new Error('Method not implemented.');
  }
  getCarInfo() {
    throw new Error('Method not implemented.');
  }
  showTrack(userid, locid) {
    const mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.trackingService.getTrackForUser(userid, locid).subscribe(res => {
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      this.position = this.geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
      setTimeout(() => {
        const latLng = new google.maps.LatLng(this.latitude, this.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
        google.maps.Marker({
          icon: '../../../assets/photo/driver.png',
          position: latLng,
          map: this.map,
          title: 'Driver Name : *** Car : **** speed : ****',
        });
      }, 5000);
    });
  }
}
