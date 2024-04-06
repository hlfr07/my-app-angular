import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { inject } from '@angular/core';

export const valiloginGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(AuthServiceService);
  const router = inject(Router);

  const role = AuthService.decodeToken();

  if (role === null) {
    return true;
  } else {
    if (role === 'ADMIN') {
      router.navigateByUrl('/admin');
      return false;
    } else if (role === 'USUARIO') {
      router.navigateByUrl('/usuario');
      return false;
    } else {
      return true;
    }
  }
};
