import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';

export const PathGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const conexion = inject(AuthenticationService)

  console.log(route);
  

  // conexion.isAuthorized(router.url);
  if(!conexion.isAuthorized(route)) {
    router.navigate(['dashboard']);
  }
  
  return true;
};
