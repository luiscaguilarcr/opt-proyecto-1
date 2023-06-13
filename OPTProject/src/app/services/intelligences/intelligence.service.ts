import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IntelligenceService {
  URL = `${environment.apiUrl}intelligences`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    }),
  };

  constructor(private http: HttpClient) {}

  getIntelligences() {
    return this.http.get<[]>(`${this.URL}/`, this.httpOptions);
  }
}
