import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class IntelligenceService {
  URL = `${environment.apiUrl}intelligences`;
  constructor(private http: HttpClient) {}

  getIntelligences() {
    return this.http.get<[]>(`${this.URL}/`, httpOptions);
  }

  getMatches() {
    return this.http.get<[]>(`${this.URL}_profiles/actions/matches/`, httpOptions);
  }
}
