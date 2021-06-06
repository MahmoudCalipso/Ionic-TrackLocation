import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  currentPageTitle = 'Menu';

  appPages = [
    {
      title: 'Home',
      url: '',
      icon: 'home'
    },
    {
      title: 'List Tracking',
      url: 'list-tracking',
      icon: 'car-sport'
    },
    {
      title: 'Start Tracking',
      url: 'tracking',
      icon: 'analytics'
    },
    {
      title: 'Account',
      url: 'account',
      icon: 'accessibility'
    }
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/sign-in');
     }
  }
  openPage(page: any  ) {
    this.router.navigateByUrl(`/${page.url}`);
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/sign-in');
  }

}
