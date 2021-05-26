import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { TrackingPage } from '../tracking/tracking.page';
import { SignInPage } from '../sign-in/sign-in.page';
import { ShowTrackPage } from '../show-track/show-track.page';
import { ListTrackingPage } from '../list-tracking/list-tracking.page';
import { AccountPage } from '../account/account.page';
import { TrackingPageModule } from '../tracking/tracking.module';
import { SignInPageModule } from '../sign-in/sign-in.module';
import { ShowTrackPageModule } from '../show-track/show-track.module';
import { ListTrackingPageModule } from '../list-tracking/list-tracking.module';
import { AccountPageModule } from '../account/account.module';
import { HomePageModule } from 'src/app/home/home.module';
import { HomePage } from 'src/app/home/home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    // TrackingPage,
    // SignInPage,
    // ShowTrackPage,
    // ListTrackingPage,
    // AccountPage,
    // HomePage,
    TrackingPageModule,
    SignInPageModule,
    ShowTrackPageModule,
    ListTrackingPageModule,
    AccountPageModule,
    HomePageModule
  ],
  entryComponents: [
    TrackingPage,
    SignInPage,
    ShowTrackPage,
    ListTrackingPage,
    AccountPage,
    HomePage,
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
