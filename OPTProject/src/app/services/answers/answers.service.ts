import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { environment } from 'src/environments/environments';
import { httpOptions } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  URL = `${environment.apiUrl}actions/submit/`;
  constructor(private http: HttpClient) {}

  putAnswers(answers: Answer[]): Observable<any> {
    return this.http.put<any>(this.URL, answers, httpOptions);
  }

}
