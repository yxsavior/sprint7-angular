import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('isLoggedIn?', this.authService.isLoggedIn()); // Depuração
      if (this.authService.isLoggedIn()) {
        return true;
    } else {
      // Redireciona para o login caso o usuário não esteja autenticado
      this.router.navigate(['/login']);
      return false;
    }

  }
}
