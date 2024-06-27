import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../types/user';
import { Router } from '@angular/router';
import { AuthDomainService } from '../../auth/domain/services/auth-domain.service';
import { Authenticated } from 'src/app/auth/domain/models/auth.model';
import { MatDialog } from '@angular/material/dialog';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // eslint-disable-next-line
  // private currentUserSubject: BehaviorSubject<User | any>;
  // public currentUser: Observable<User>;

  private expiryTimer: any;
  contador: number = 0;


  public currentUser = this.authDomainService.currentUserData;
  constructor(
    private router: Router,
    private http: HttpClient,
    private authDomainService: AuthDomainService,
    private mensajeriaSignal: MensajeriaSignal,
    private dialogs: MatDialog,
  ) {

    authDomainService.currentUserData.set(JSON.parse(localStorage.getItem('currentUserData')!));
    authDomainService.currentMenu.set(JSON.parse(localStorage.getItem('currentMenu')!));
    authDomainService.currentRol.set(JSON.parse(localStorage.getItem('currentRol')!));
    // const expToken = JSON.parse(localStorage.getItem('currentUserData')!).exp;
    authDomainService.currentExpirarToken.set(parseInt(JSON.parse(localStorage.getItem('currentUserData')!)?.exp + '000'));
    
    this.mensajeriaSignal.setMensajeriaDataAsignacion( JSON.parse( localStorage.getItem('mensajeriaData')!))

    const timer = new Date( new Date( this.authDomainService.currentExpirarToken() ).getTime() - new Date().getTime() ).getMinutes();
    this.authDomainService.setCurrentTimer(timer)
    this.expiryTimer = setInterval(() => {

      if( this.authDomainService.checkExpiredToken() ) {

        this.dialogs.closeAll();
        if(this.authDomainService.currentTimer() == 0 && this.contador == 1) {
          return
        }
        this.router.navigate(['/auth/logout']);
        this.contador++;
        console.log('if', this.authDomainService.currentTimer());
        
      } else {
          const timer = new Date( new Date( this.authDomainService.currentExpirarToken() ).getTime() - new Date().getTime() ).getMinutes();
          this.authDomainService.setCurrentTimer(timer);
          console.log('else', this.authDomainService.currentTimer());

        }
      ; }, 60000);
    // eslint-disable-next-line
    // this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): Authenticated {
  //   return this.currentUser();
  // }

  // login(email: string, password: string) {
  //   return this.http.post<User>(`${environment.apiUrl}/api/account/login`, { email, password }).pipe(
  //     map((user) => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       return user;
  //     })
  //   );
  // }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  //   this.router.navigate(['/auth/login']); ///authentication-1/login
  // }
}
