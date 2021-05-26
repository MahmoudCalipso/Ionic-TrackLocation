import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModule } from '../modules/user/user.module';


const API_PATH = 'http://localhost:5000/api/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id): Observable<UserModule> {
    return this.http.get<UserModule>(API_PATH + '/' + id, { responseType: 'json' });
  }
  updateUser(id): Observable<UserModule>{
    return this.http.put<UserModule>(API_PATH + '/' + id, { responseType: 'json' });
  }

}
