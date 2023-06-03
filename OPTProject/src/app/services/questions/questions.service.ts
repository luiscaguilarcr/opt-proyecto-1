import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { question } from 'src/app/models/question';
import { environment } from 'src/environments/environments';
import { httpOptions } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  URL = `${environment.apiUrl}questions`;
  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<question[]>(`${this.URL}/`, httpOptions);
  }
}
