import { Injectable } from '@angular/core';

const USER_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123456') {
      this.isAuthenticated = true;

      sessionStorage.setItem(USER_KEY, 'authenticated');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {

    // const user = sessionStorage.getItem(USER_KEY);
    // return user ? true : false;
    return sessionStorage.getItem(USER_KEY) !== null;
  }
}
