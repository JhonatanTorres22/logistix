import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccessTokenData, Authenticar, RolUsuario, UsuarioResponse } from "../../domain/models/authenticar.model";
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
        localStorage.setItem('token', JSON.stringify(apiResponse.data))

        const decodedToken = {
          ...jwtDecode<JwtPayload>(apiResponse.data.accessToken),
          serviceToken: apiResponse.data.accessToken
        };
        console.log(decodedToken, 'decoded');

      })
    )
  }

}
