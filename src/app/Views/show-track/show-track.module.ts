import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowTrackPageRoutingModule } from './show-track-routing.module';

import { ShowTrackPage } from './show-track.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowTrackPageRoutingModule
  ],
  declarations: [ShowTrackPage]
})
export class ShowTrackPageModule {}
