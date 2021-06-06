import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage  } from '@ionic/storage';

const AUTH_API = 'http://localhost:5000/api/Authentication/';
const TOKEN_KEY = 'auth-token';
const USER_INFO = 'auth-info';
const USER_CREATEDBY = 'auth-createdBy';
const USER_EMAIL = 'auth-email';
const USER_ID = 'auth-id';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
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
    const token = await this.storage.get( TOKEN_KEY );
    if (token) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  async login(credentials: { email, password }): Promise<Observable<any>>{
    return await this.http.post<any>(AUTH_API + 'signin', credentials).pipe(
      tap(res => {
       this.storage.set(TOKEN_KEY, res.token);
       this.storage.set(USER_CREATEDBY, res.CreatedByAdminID);
       this.storage.set(USER_INFO, res);
       this.storage.set(USER_EMAIL, res.Email);
       this.storage.set(USER_ID, res.UserId);
       console.log(res);
       return from(Promise.all([TOKEN_KEY, USER_CREATEDBY, USER_ID ]));
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
  logout(){
    return this.http.post(AUTH_API + 'logout', {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        this.storage.remove( USER_CREATEDBY );
        this.storage.remove(  USER_EMAIL );
        this.storage.remove(USER_ID );
        this.storage.remove( TOKEN_KEY );
        this.storage.remove( USER_INFO );
        return from(Promise.all([TOKEN_KEY, USER_CREATEDBY, USER_ID ]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/sign-in', { replaceUrl: true });
      })
    ).subscribe();
  }

  getNewAccessToken() {
    const refreshToken = from(this.storage.get( TOKEN_KEY ));
    return refreshToken.pipe(
      switchMap(token => {
        if (token) {
           httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
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
    return this.storage.set( TOKEN_KEY, accessToken );
  }
}
