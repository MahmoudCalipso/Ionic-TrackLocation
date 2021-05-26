import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarModule } from '../car/car.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TrackModule {
  TrackID: number;
  latitude: number;
  longitude: number;
  speed: number;
  ENGINE_RPM: number;
  ENGINE_LOAD: string;
  AmbientAirTemp: string;
  ThrottlePos: string;
  insFuel: number;
  valX: number;
  valY: number;
  valZ: number;
  zone: string;
  timestamp: Date;
  LocationId: number;
  location: Location[];
  car: CarModule[];
}
