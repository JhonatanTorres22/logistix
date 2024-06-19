import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { HttpErrorInterceptor } from './http-error/http-error.interceptor';
import { RequestFormatInterceptor } from './request-format/request-format.interceptor';

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestFormatInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
