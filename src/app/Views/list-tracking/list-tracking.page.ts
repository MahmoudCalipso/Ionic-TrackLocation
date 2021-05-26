import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {  Observable, throwError } from 'rxjs';
import { TrackModule } from 'src/app/modules/track/track.module';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-list-tracking',
  templateUrl: './list-tracking.page.html',
  styleUrls: ['./list-tracking.page.scss'],
})
export class ListTrackingPage implements OnInit {
  UserId: number;
  locid: number;
  tracks$: Observable<TrackModule[]>;
  constructor(private trackingService: TrackingService,
              private storage: Storage,
              private router: Router) { }

  ngOnInit() {
    parseInt(this.storage.getItem('USER_ID'), this.UserId);
    this.getAllTrackingForDriver(this.UserId);
    this.getTrackSelected(this.UserId, this.locid);
  }


   getAllTrackingForDriver(userid: number): Observable<TrackModule[]> {
    return this.tracks$ = this.trackingService.getAllTrackingUser(userid);
  }


  getTrackSelected(userId: any, locId: any) {
    return this.router.navigateByUrl(`show-track/${userId}/${locId}`);
  }
}
