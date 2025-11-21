import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticarService } from 'src/app/auth/infraestructure/services/authenticar.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
    private authenticarService:AuthenticarService,
    private authenticar : AuthenticarService
  ) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authenticarService.getToken();
   
    const isLoggedIn = currentUser;
    const isApiUrl = request.url.startsWith(environment.EndPoint);
       
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      });
    }

    return next.handle(request);
  }
}
