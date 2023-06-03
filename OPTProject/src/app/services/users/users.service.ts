import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser } from 'src/app/models/user';
import { user } from 'src/app/models/user';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL = `${environment.apiUrl}users`;
  constructor(private http: HttpClient) {}

  createUser(user: createUser) {
    return this.http.post<user>(`${this.URL}/`, user,);
  }
}
