import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { TrackingPage } from './Views/tracking/tracking.page';
import { SignInPage } from './Views/sign-in/sign-in.page';
import { ShowTrackPage } from './Views/show-track/show-track.page';
import { ListTrackingPage } from './Views/list-tracking/list-tracking.page';
import { AccountPage } from './Views/account/account.page';
import { MenuPage } from './Views/menu/menu.page';
import { HomePageModule } from './home/home.module';
import { AccountPageModule } from './Views/account/account.module';
import { ListTrackingPageModule } from './Views/list-tracking/list-tracking.module';
import { ShowTrackPageModule } from './Views/show-track/show-track.module';
import { SignInPageModule } from './Views/sign-in/sign-in.module';
import { TrackingPageModule } from './Views/tracking/tracking.module';
import { MenuPageModule } from './Views/menu/menu.module';
import { HomePage } from './home/home.page';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    TrackingPage,
    SignInPage,
    ShowTrackPage,
    ListTrackingPage,
    AccountPage,
    HomePage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TrackingPageModule,
    SignInPageModule,
    ShowTrackPageModule,
    ListTrackingPageModule,
    AccountPageModule,
    HomePageModule,
    MenuPageModule,
    IonicModule.forRoot(),
  ],
  providers: [
    Storage,
    Platform,
    StatusBar,
    SplashScreen,
    AuthenticationService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
