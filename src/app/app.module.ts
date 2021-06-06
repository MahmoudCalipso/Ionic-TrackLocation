import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage  } from '@ionic/storage';
import { HomePage } from './home/home.page';
import { AccountPage } from './Views/account/account.page';
import { ListTrackingPage } from './Views/list-tracking/list-tracking.page';
import { ShowTrackPage } from './Views/show-track/show-track.page';
import { SignInPage } from './Views/sign-in/sign-in.page';
import { TrackingPage } from './Views/tracking/tracking.page';
import { HomePageModule } from './home/home.module';
import { AccountPageModule } from './Views/account/account.module';
import { ListTrackingPageModule } from './Views/list-tracking/list-tracking.module';
import { ShowTrackPageModule } from './Views/show-track/show-track.module';
import { SignInPageModule } from './Views/sign-in/sign-in.module';
import { TrackingPageModule } from './Views/tracking/tracking.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { MenuPageModule } from './Views/menu/menu.module';
import { MenuPage } from './Views/menu/menu.page';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    TrackingPage,
    SignInPage,
    ShowTrackPage,
    ListTrackingPage,
    MenuPage,
    AccountPage,
    HomePage
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    MenuPageModule,
    AppRoutingModule,
    TrackingPageModule,
    SignInPageModule,
    ShowTrackPageModule,
    ListTrackingPageModule,
    AccountPageModule,
    HomePageModule,
  ],
  providers: [
    Storage,
    Platform,
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    AuthenticationService,
    AuthGuard,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
