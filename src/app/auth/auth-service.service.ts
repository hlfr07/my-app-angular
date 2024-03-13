import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private cookieService: CookieService) {}

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any;
      return decodedToken.role;
    }
    return null;
  }
}
