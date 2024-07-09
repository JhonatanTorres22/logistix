import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { AuthService } from '../../auth/infraestructure/services/auth.service';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private auth: AuthSignal,

  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authenticationService.currentUserValue; template
    const currentUser = this.auth.currentUserData;
    const expired = this.auth.checkExpiredToken();
    // console.log(currentUser());
    
    if (currentUser() && currentUser().serviceToken !== '' && !expired) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url /authentication-1/login
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    console.log('Saliendo....');
    
    return false;
  }
}
