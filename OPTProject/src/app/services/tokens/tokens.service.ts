import { Injectable } from '@angular/core';
import { token } from 'src/app/models/token';

@Injectable({
    providedIn: 'root'
})

export class TokenService {
private accessToken = 'access_token';

constructor() {}

saveToken(token: token) {
    localStorage.setItem(this.accessToken, `${token.token_type} ${token.access_token}`);
}

getToken(): string | null {
    return localStorage.getItem(this.accessToken);
}

removeToken() {
    localStorage.removeItem(this.accessToken);
}

}
