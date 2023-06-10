import { Injectable } from '@angular/core';
import {httpOptions} from "../utils";
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  results: [] = [];
  URL = `${environment.apiUrl}intelligences_profiles`;
  constructor(private http: HttpClient) {}
  getResults() {
    return this.http.get<[]>(`${this.URL}/`, httpOptions);
  }
}
