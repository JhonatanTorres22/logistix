import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AuthService } from 'src/app/auth/infraestructure/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    // private authenticationService: AuthenticationService,
    private authenticationService: AuthService,
    private dialogs: MatDialog,
    private errorService: ErrorService
  ) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    return next.handle(request).pipe(
      // catchError((err) => {
   

      catchError((err) => {
        console.log(err);
        
        if (err.status === 401) {
        this.dialogs.closeAll();

          // auto logout if 401 response returned from api
          this.authenticationService.logout();
        }

        let errorMessage = '';
        if (err instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${err.error?.message}`;
        } else {
          errorMessage = `Server-side error: ${err.status} ${err?.message}`;
        }

        // const error = err.error.message || err.statusText;
        // return throwError(error);
        this.errorService.show(errorMessage);
        return throwError(() => errorMessage);
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
