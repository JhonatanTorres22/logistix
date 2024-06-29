import { HttpClient } from "@angular/common/http";
import { Injectable, effect, signal } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";
import { User } from "src/app/@theme/types/user";
import { environment } from "src/environments/environment";
import { AuthDTO, RolDTO } from "../dto/auth.dto";
import { AccessToken, AccessTokenData, Auth, AuthLogin, Authenticated, Rol } from "../../domain/models/auth.model";
import { AuthMapper } from "../../domain/mappers/auth.mapper";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Usuario } from "src/app/usuarios/domain/models/usuario.model";
import { AuthDomainService } from "../../domain/services/auth-domain.service";
import { MensajeriaSignal } from "src/app/mensajeria/domain/signals/mensajeria.signal";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    //TODO: CAMBIAR EL TIPO USER A AUTH
    private currentUserSubject: BehaviorSubject<Auth | any>;
    public currentUser: Observable<User>;

    private urlApi: string;
    private urlLogin: string;

    

    constructor(
        private router: Router,
        private http: HttpClient,
        private authDomainService: AuthDomainService,
        private mensajeriaSignal: MensajeriaSignal
      ) {
        this.urlApi = environment.EndPoint;
        this.urlLogin = 'api/Usuario/Autenticar';

        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();

        effect( () => {
          console.log('algo cambi+o');
          
        })
      }

    public get currentUserValue(): Auth {
        return this.currentUserSubject.value;
    }


    login( login: Auth ) {
      const apiLogin = AuthMapper.fromDomainToApi( login );
      // console.log( apiLogin );
      
      return this.http.post<AccessTokenData>(`${ this.urlApi }${ this.urlLogin}`, apiLogin ).pipe(
        map( (apiResponse) => {
          localStorage.setItem('token', JSON.stringify(apiResponse.data));
          const decodedToken = {
            ...jwtDecode<JwtPayload>(apiResponse.data.accessToken),
            serviceToken: apiResponse.data.accessToken
          };
          // console.log(decodedToken);
          
          // localStorage.setItem('currentUserData', JSON.stringify(decodedToken));
          // this.authDomainService.setCurrentUserData( JSON.parse(localStorage.getItem('currentUserData')!));
          // const menusToRoleOfUsersDTO: RolDTO[] = JSON.parse(this.authDomainService.currentUserData().Roles);
          // const menusToRoleOfUsersDomain: Rol[] = menusToRoleOfUsersDTO.map( AuthMapper.fromApiToDomainRol );
          // const menusToRoleOfUsers = this.authDomainService.currentMenuToRole;
          // this.authDomainService.setMenusToRoleOfUsers( menusToRoleOfUsersDomain );
          // localStorage.setItem('menusToRoleOfUsers', JSON.stringify(menusToRoleOfUsers()));
          // const menu = AuthMapper.fromDomainToTemplateMenu(menusToRoleOfUsersDomain[0].menus)
          // localStorage.setItem('currentMenu', JSON.stringify([menu]));

          // console.log(menusToRoleOfUsers);
          
          return apiResponse.data
        })
      );
    }

    selectedRol( rol: RolDTO[], token: string ) {
      const decodedToken = {
        ...jwtDecode<JwtPayload>(token),
        serviceToken: token
      };
      localStorage.setItem('currentUserData', JSON.stringify(decodedToken));
      this.authDomainService.setCurrentUserData( JSON.parse(localStorage.getItem('currentUserData')!));
      const menusToRoleOfUsersDTO: RolDTO[] = rol;
      const menusToRoleOfUsersDomain: Rol[] = menusToRoleOfUsersDTO.map( AuthMapper.fromApiToDomainRol );
      
      // const menusToRoleOfUsers = this.authDomainService.currentMenuToRole;
      // this.authDomainService.setMenusToRoleOfUsers( menusToRoleOfUsersDomain );
      // localStorage.setItem('menusToRoleOfUsers', JSON.stringify(menusToRoleOfUsers()));
      const menu = AuthMapper.fromDomainToTemplateMenu(menusToRoleOfUsersDomain[0].menus)
      localStorage.setItem('currentMenu', JSON.stringify([menu]));
      localStorage.setItem('currentRol', JSON.stringify(menusToRoleOfUsersDomain[0]));
      localStorage.setItem('mensajeriaData', JSON.stringify(this.mensajeriaSignal.mensajeriaInsertarDataAsignacion));

      this.authDomainService.setCurrentMenu([menu]);
      this.authDomainService.setCurrentRol(menusToRoleOfUsersDomain[0]);
      this.authDomainService.setCurrentExpirarToken( parseInt(this.authDomainService.currentUserData().exp + '000') );
      
      // console.log(menusToRoleOfUsers);
    }

    // setUserData( userData: Authenticated) {
    //   this.userData.set( userData );
    // }

    // login(login: Auth) {
        
    //     const apiLogin = AuthMapper.fromDomainToApi( login )
    //     console.log(apiLogin);
    //     const email = apiLogin.nombreUsuario;
    //     const password = apiLogin.clave
    //     return this.http.post<AuthDTO>(`${environment.apiUrl}/api/account/login`, {email, password} ).pipe(
    //       map( 
    //         (user) => {
    //         console.log(user);
            
      
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUserSubject.next(user);
    //         return user;
    //       }
    //     )
    //     );
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUserData');
        localStorage.removeItem('currentRol');
        localStorage.removeItem('currentMenu');

        this.authDomainService.setCurrentUserDefault();
        this.router.navigate(['/auth/login']); ///authentication-1/login
    }
}