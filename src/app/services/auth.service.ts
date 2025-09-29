import { Injectable } from '@angular/core';

const USER_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() {}

  // Método de login modificado para armazenar no sessionStorage
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123456') {
      this.isAuthenticated = true;

      // Armazenar um valor no sessionStorage para persistir a autenticação
      sessionStorage.setItem(USER_KEY, 'authenticated'); // Ou qualquer valor que você quiser armazenar
      return true;
    }
    return false;
  }

  // Logout: limpa a autenticação e o armazenamento
  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.removeItem(USER_KEY);
  }

  // Método para verificar se o usuário está logado
  isLoggedIn(): boolean {

    // const user = sessionStorage.getItem(USER_KEY);
    // return user ? true : false;
    return sessionStorage.getItem(USER_KEY) !== null;
  }
}
