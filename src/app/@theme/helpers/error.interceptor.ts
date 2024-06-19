import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AuthService } from 'src/app/auth/infraestructure/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    // private authenticationService: AuthenticationService,
    private authenticationService: AuthService,
    
    private errorService: ErrorService
  ) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    return next.handle(request).pipe(
      // catchError((err) => {
   

      catchError((err) => {
        console.log(err);
        
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
        }

        const error = err.error.message || err.statusText;
        // return throwError(error);
        this.errorService.show(error);
        return throwError(() => error);
      })

      //   let errorMessage = '';
      //   if (error instanceof ErrorEvent) {
      //     errorMessage = `Client-side error: ${error.error?.message}`;
      //   } else {
      //     errorMessage = `Server-side error: ${error.status} ${error?.message}`;
      //   }
      //   this.errorService.show(errorMessage);
      //   return throwError(() => errorMessage);
      // })
    );
  }
}
