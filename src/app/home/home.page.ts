import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentPageTitle = 'Home';
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }
  ngOnInit() {
    if (Storage.get({ key: 'TOKEN_KEY'}) == null && !this.authService.isAuthenticated ) {
      this.router.navigate(['/sign-in']);
    }

  }


}
