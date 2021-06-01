import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  currentPageTitle = 'Dashboard';

  appPages = [
    {
      title: 'Home',
      url: '',
      icon: 'home'
    },
    {
      title: 'List Tracking',
      url: '/list-tracking',
      icon: 'tracking'
    },
    {
      title: 'Start Tracking',
      url: '/tracking',
      icon: 'tracking'
    },
    {
      title: 'Account',
      url: '/account',
      icon: 'Profile'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
    if (this.storage.getItem('USER_INFO') != null) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['sign-in']);
     }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['sign-in']);
  }
}
