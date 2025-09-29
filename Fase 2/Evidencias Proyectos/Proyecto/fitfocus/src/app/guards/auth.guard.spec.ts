import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const logueado = await authService.estaLogueado();
  if (logueado) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};