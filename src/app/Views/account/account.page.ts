import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModule } from 'src/app/modules/user/user.module';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  UserId: any;
  UserAccount: UserModule;
  currentPageTitle = 'Account Info';

  constructor(private router: Router,
              private userService: UserService ) { }

  ngOnInit() {
    this.UserId = Storage.get({key: 'USER_ID'});
    this.getInformationUser(this.UserId);
  }
  getInformationUser(idUser: number) {
    this.userService.getUserById(idUser).
    pipe(
      map((user: UserModule) => {
        this.UserAccount = user;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    );
  }

}
