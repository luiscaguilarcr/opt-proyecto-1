import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { environment } from 'src/environments/environments';
import { httpOptions } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  URL = `${environment.apiUrl}actions/submit/`;
  constructor(private http: HttpClient) {}

  putAnswers(answer: Answer) {
    return this.http.put<Answer[]>(this.URL, answer, httpOptions);
  }
}