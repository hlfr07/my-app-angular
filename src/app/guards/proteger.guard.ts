import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';

export const protegerGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(AuthServiceService);
  const router = inject(Router);

  const role = AuthService.decodeToken();

  // Obtener la URL de la ruta solicitada
  const rutasolicitada = state.url;

  if (role === null) {
    router.navigateByUrl('/login');
    return false;
  } else {
    if (role === 'ADMIN' && rutasolicitada === '/admin') {
      return true;
    } else if (role === 'USUARIO' && rutasolicitada === '/usuario') {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  }
};
