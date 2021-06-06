import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private storage: Storage) {
  }
  ngOnInit() {
    if (this.storage.get('TOKEN_KEY') == null && !this.authService.isAuthenticated ) {
      this.router.navigate(['/sign-in']);
    }

  }


}
