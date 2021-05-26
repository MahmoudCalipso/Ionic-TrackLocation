import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, Subject, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { AlertController, Platform } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
const { Storage } = Plugins;

const AUTH_API = 'http://localhost:5000/api/Authentication/';
const TOKEN_KEY = 'auth-token';
const USER_INFO = 'auth-info';
const USER_CREATEDBY = 'auth-createdBy';
const USER_EMAIL = 'auth-email';
const USER_ID = 'auth-id';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  token = '';
  user: any;
  createdby: void;
  useremail: void;
  userid: void;

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController,
              private storage: Storage) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email, password }) {
    return this.http.post<any>(AUTH_API + 'signin', credentials).pipe(
      tap(res => {
        const tokenKey =  this.storage.setItem(TOKEN_KEY, res.token);
        const createdby = this.storage.setItem(USER_CREATEDBY, res.CreatedByAdminID);
        const user = this.storage.setItem(USER_INFO, res);
        const useremail = this.storage.setItem(USER_EMAIL, res.Email);
        const userid = this.storage.setItem(USER_ID, res.UserId);
        console.log(res);
        return from(Promise.all([tokenKey, user]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    // tslint:disable-next-line: no-shadowed-variable
    alert.then(alert => alert.present());
  }
  logout() {
    return this.http.post(AUTH_API + 'logout', {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        // Remove all stored tokens
        const createdby = this.storage.remove({ key: USER_CREATEDBY });
        const useremail = this.storage.remove({ key: USER_EMAIL });
        const userid = this.storage.remove({ key: USER_ID });
        const tokenKey = this.storage.remove({ key: TOKEN_KEY});
        const user =  this.storage.remove({ key: USER_INFO });
        return from(Promise.all([tokenKey, user]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/login', { replaceUrl: true });
      })
    ).subscribe();
  }

  getNewAccessToken() {
    const refreshToken = from(Storage.get({ key: TOKEN_KEY }));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          // tslint:disable-next-line: no-shadowed-variable
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.value}`
            })
          };
          return this.http.get(AUTH_API + '/refresh-token', httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }
   // Store a new access token
   storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(Storage.set({ key: TOKEN_KEY, value: accessToken }));
  }
}
