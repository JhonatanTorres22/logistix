import { Injectable } from "@angular/core";
import { AuthenticarRepository } from "../../domain/repositories/authenticar.repository";
import { AuthenticarService } from "../services/authenticar.service";
import { Observable } from "rxjs";
import { AccessToken, Authenticar, RolUsuario, UsuarioResponse } from "../../domain/models/authenticar.model";
import { UsuarioResponseDto } from "../dto/authenticar.dto";

@Injectable({
    providedIn: 'root'
})

export class AuthenticarRepositoryImpl implements AuthenticarRepository {
  constructor(private service: AuthenticarService) {}

  obtenerRoles(nombreUsuario: string): Observable<UsuarioResponse> {
    return this.service.obtenerRol(nombreUsuario);
  }


  login(login: Authenticar): Observable<any> {
    return this.service.login(login)  
  }
}
