import { Injectable } from '@angular/core';
import { token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private accessToken = 'access_token';

  constructor() {}

  setToken(token: token) {
    localStorage.setItem(this.accessToken, `${token.token_type} ${token.access_token}`);
  }

  removeToken() {
    localStorage.removeItem(this.accessToken);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessToken);
  }
}
