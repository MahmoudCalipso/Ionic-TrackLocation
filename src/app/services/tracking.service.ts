import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationModule } from '../modules/location/location.module';
import { TrackModule } from '../modules/track/track.module';

const API_PATH = 'http://localhost:5000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private http: HttpClient) { }

  saveLocation(loc): Observable<LocationModule>{
    return this.http.post<LocationModule>(API_PATH + 'Locations', loc);
  }
  saveTracksForLocation(track): Observable<TrackModule>{
    return this.http.post<TrackModule>(API_PATH + 'Tracks', track);
  }
  getAllTrackingUser(userid: any ): Observable<TrackModule[]>{
    return this.http.get<TrackModule[]>(API_PATH + 'UserLocations/' + userid );
  }
  getTrackForUser(userid: any , locId: any): Observable<TrackModule>{
    return this.http.get<TrackModule>(API_PATH + 'UserLocations/' + userid + '/' + locId);
  }
  updateLocation(locId: number , data: LocationModule): Observable<LocationModule>{
    return this.http.put<LocationModule>(API_PATH + 'UserLocations/' + locId,  data);
  }
}
