import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nome = '';
  senha = '';
  loginError: string = '';
  isLoggingIn: boolean = false; // Novo: variável para controlar o estado de login

  constructor(private authService: AuthService, private router: Router) {}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
  this.isLoggingIn = true;

  // console.log('Tentando fazer login com:', this.nome, this.senha);

  if (this.authService.login(this.nome, this.senha)) {
    console.log('Login bem-sucedido'); // Depuração
    this.router.navigate(['/home']);
  } else {
    console.log('Tentativa de login falhou'); // Depuração
    this.loginError = 'Usuário ou senha inválidos.';
  }

  this.isLoggingIn = false;
  }
}
