import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTrackingPageRoutingModule } from './list-tracking-routing.module';

import { ListTrackingPage } from './list-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTrackingPageRoutingModule
  ],
  declarations: [ListTrackingPage]
})
export class ListTrackingPageModule {}
