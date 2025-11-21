import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccessTokenData, Authenticar, Authenticated, RolUsuario, UsuarioResponse } from "../../domain/models/authenticar.model";
import { UsuarioResponseDto } from "../dto/authenticar.dto";
import { AuthenticarMapper } from "../../domain/mappers/authenticar.mapper";
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class AuthenticarService {
  private urlApi: string
  private urlListarRol: string
  private urlAuthenticar: string

  constructor(
    private http: HttpClient
  ) {
    this.urlApi = environment.EndPoint,
      this.urlListarRol = '/api/usuario/ListarRoles?nombreUsuario='
    this.urlAuthenticar = '/api/usuario/Autenticar'
  }

  obtenerRol = (dni: string): Observable<UsuarioResponse> => {
    return this.http.get<UsuarioResponseDto>(this.urlApi + this.urlListarRol + dni)
      .pipe(
        map(AuthenticarMapper.fromDtoData)
      );
  };

  login = (login: Authenticar) => {
    const apiLogin = AuthenticarMapper.fromDomainToApiLogin(login)
    return this.http.post<AccessTokenData>(this.urlApi + this.urlAuthenticar, apiLogin).pipe(
      map((apiResponse) => {
        
        const decodedToken = {
          ...jwtDecode<JwtPayload>(apiResponse.data.token),
          serviceToken: apiResponse.data.token
        };
        localStorage.setItem('userData', JSON.stringify(decodedToken))
        
        localStorage.setItem('token', JSON.stringify(decodedToken.serviceToken))
       // console.log(decodedToken, 'decoded');

      })
    )
  }

getToken(): string | null {
  const tokenData = localStorage.getItem('token');
  if (!tokenData) return null;
  const parsed = JSON.parse(tokenData);
  return parsed; // el JWT real
}

getUserData(): Authenticated | null {
 const userData = localStorage.getItem('userData');
  if (!userData) return null;
  try {
    return JSON.parse(userData) as Authenticated;
  } catch {
    return null;
  } 
}


}
