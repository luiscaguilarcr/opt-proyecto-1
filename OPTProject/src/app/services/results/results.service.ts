import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  results: [] = [];
  URL = `${environment.apiUrl}intelligences_profiles`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    }),
  };

  constructor(private http: HttpClient) {}

  getResults() {
    return this.http.get<[]>(`${this.URL}/`, this.httpOptions);
  }

  getMatches() {
    return this.http.get<[]>(`${this.URL}/actions/matches/`, this.httpOptions);
  }
}
