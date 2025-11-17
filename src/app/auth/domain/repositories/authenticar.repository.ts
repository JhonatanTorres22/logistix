import { Observable } from "rxjs";
import { AccessToken, Authenticar, RolUsuario, UsuarioResponse } from "../models/authenticar.model";

export abstract class AuthenticarRepository {
  abstract obtenerRoles(nombreUsuario: string): Observable<UsuarioResponse>;
  abstract login( login: Authenticar): Observable<AccessToken>
}
