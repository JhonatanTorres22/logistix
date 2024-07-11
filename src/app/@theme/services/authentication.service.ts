import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { NavigationItem } from '../types/navigation';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // eslint-disable-next-line
  // private currentUserSubject: BehaviorSubject<User | any>;
  // public currentUser: Observable<User>;

  private expiryTimer: any;
  contador: number = 0;


  public currentUser = this.auth.currentUserData;
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthSignal,
    private mensajeriaSignal: MensajeriaSignal,
    private semestreSignal: SemestreSignal,
    private dialogs: MatDialog,
  ) {

    const currentUserData = JSON.parse(localStorage.getItem('currentUserData')!)
    console.log( currentUserData );
    
    let currentUserDataJSON = {
      ...currentUserData,
      Roles: currentUserData ? JSON.parse( currentUserData.Roles ) : ''
    }

    if( currentUserData ) {
      auth.currentUserData.set(currentUserDataJSON);
    }
    auth.currentMenu.set(JSON.parse(localStorage.getItem('currentMenu')!));
    auth.currentRol.set(JSON.parse(localStorage.getItem('currentRol')!));
    semestreSignal.setSelectSemestre( JSON.parse( localStorage.getItem('currentSemestre')! ))
    // const expToken = JSON.parse(localStorage.getItem('currentUserData')!).exp;
    auth.currentExpirarToken.set(parseInt(JSON.parse(localStorage.getItem('currentUserData')!)?.exp + '000'));
    
    // const data = localStorage.getItem('mensajeriaData') ? localStorage.getItem('mensajeriaData') : this.mensajeriaSignal.mensajeriaInsertarDataAsignacion;

    const mensajeriaData = localStorage.getItem('mensajeriaData') ? JSON.parse(localStorage.getItem('mensajeriaData')!) : this.mensajeriaSignal.mensajeriaAsignacionDefault;

    this.mensajeriaSignal.setMensajeriaDataAsignacion( mensajeriaData )

    const timer = new Date( new Date( this.auth.currentExpirarToken() ).getTime() - new Date().getTime() ).getMinutes();
    this.auth.setCurrentTimer(timer)
    this.expiryTimer = setInterval(() => {

      if( this.auth.checkExpiredToken() ) {

        this.dialogs.closeAll();
        if(this.auth.currentTimer() == 0 && this.contador == 1) {
          return
        }
        this.router.navigate(['/auth/logout']);
        this.contador++;
        console.log('if', this.auth.currentTimer());
        
      } else {
          const timer = new Date( new Date( this.auth.currentExpirarToken() ).getTime() - new Date().getTime() ).getMinutes();
          this.auth.setCurrentTimer(timer);
          console.log('else', this.auth.currentTimer());

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

  isAuthorized(ruta: ActivatedRouteSnapshot) {
    //  console.log(ruta.url[0].path); 
    const menus = this.auth.currentMenu()[0].children!;
    // console.log(menus[0].url?.substring(1));
    

    const authorided = menus.find( (menu: NavigationItem) => menu.url?.substring(1) == ruta.url[0].path);
    // menus.forEach( menuItem => {
    //   console.log(menuItem.url?.substring(1))
      
    // })
    console.log(authorided);

    return authorided ? true : false;
    // return true;
  }

}
