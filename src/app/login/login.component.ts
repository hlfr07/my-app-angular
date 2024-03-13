import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as jwt from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from '../home/home.component';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup;
  loading: boolean = false;
  showPassword: boolean = false;
  errorEnSolicitud: string = '';

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
    });
  }

  mostrarpaswword() {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(controlName: string): string {
    const control = this.formulario.get(controlName);
    if (control?.hasError('minlength')) {
      return `${controlName} debe tener al menos 4 caracteres.`;
    }

    if (control?.hasError('maxlength')) {
      return `${controlName} debe tener al menos 16 caracteres.`;
    }

    return '';
  }

  onSubmitlogin() {
    const formlogin = this.formulario.value;

    if (this.formulario.valid) {
      this.loading = true;

      this.apiService
        .loginUser(formlogin)
        .then((respuesta: any) => {
          console.log(respuesta.token);
          // Almacena el token en el localStorage

          // Guardar token en la cookie
          this.cookieService.set('token', respuesta.token);

          // Guardar refresh token en la cookie
          this.cookieService.set('refreshToken', respuesta.refreshToken);

          const decodedToken = jwt.jwtDecode(respuesta.token) as any;

          if (decodedToken) {
            if (decodedToken.role === 'ADMIN') {
              this.formulario.reset();
              this.loading = false;
              window.location.href = '/admin';
            } else if (decodedToken.role === 'USUARIO') {
              this.formulario.reset();
              this.loading = false;
              window.location.href = '/usuario';
            } else {
              this.formulario.reset();
              this.loading = false;
              window.location.href = '/';
            }
          } else {
            this.formulario.reset();
            this.loading = false;
            window.location.href = '/';
          }
        })
        .catch((error: any) => {
          if (error.statusCode === 400) {
            this.errorEnSolicitud = error.message[0];
            this.loading = false;
          } else if (error.statusCode === 401) {
            this.errorEnSolicitud = error.message;
            this.loading = false;
          } else {
            this.errorEnSolicitud = 'Error en el servidor';
            this.loading = false;
          }
        });
    } else {
      console.log('Formulario inválido');
      // Puedes agregar manejo de errores o mensajes de validación aquí
    }
  }
}
