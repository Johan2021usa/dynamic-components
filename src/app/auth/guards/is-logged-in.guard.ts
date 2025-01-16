import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * Previously in Angular v16 -- When we generated guards, they used to be classes but now in v17++ they don't need to be declared as class just like a variable with an arrow function.
 * canLoad => deprecated
 * canMatch => deprecated and working as well.
*/
export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const resp = authService.isLoggedIn();
  return resp;
};

