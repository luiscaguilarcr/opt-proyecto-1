import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  URL = `${environment.apiUrl}actions/submit/`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    }),
  };

  constructor(private http: HttpClient) {}

  putAnswers(answers: Answer[]): Observable<any> {
    return this.http.put<any>(this.URL, answers, this.httpOptions);
  }

}
