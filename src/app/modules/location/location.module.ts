import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackModule } from '../track/track.module';
import { CarModule } from '../car/car.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LocationModule {
  LocationId: number;
  UserId: number;
  CarId: number;
  StartDate: Date;
  EndDate: Date;
  car: CarModule[];
  user: UserModule[];
  tracks: TrackModule[];
}
