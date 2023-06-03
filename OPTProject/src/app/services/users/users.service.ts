import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser } from 'src/app/models/user';
import { user } from 'src/app/models/user';
import { environment } from 'src/environments/environments';
import { httpOptions } from '../utils';
import { token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL = `${environment.apiUrl}users`;
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return this.http.post<token>(`${this.URL}/login/`, { 'email': email, 'password': password }, httpOptions)
  }

  singUp(user: createUser) {
    return this.http.post<user>(`${this.URL}/register/`, user, httpOptions);
  }
}
