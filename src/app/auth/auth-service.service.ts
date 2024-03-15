import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private cookieService: CookieService) { }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any;
      // Verificar si el token ha expirado
      const tokenExpiration = new Date(decodedToken.exp * 1000);
      const currentDateTime = new Date();

      if (currentDateTime > tokenExpiration) {
        // El token ha expirado, redirigir al usuario a la página de inicio de sesión
        return null; // Retorna null indicando que el token ha expirado
      }
      return decodedToken.role;
    }
    return null;
  }
}
