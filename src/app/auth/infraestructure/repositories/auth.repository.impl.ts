import { Injectable } from "@angular/core";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { Observable } from "rxjs";
import { AccessToken, Auth } from "../../domain/models/auth.model";
import { AuthService } from '../services/auth.service';
import { User } from "src/app/@theme/types/user";


@Injectable({
    providedIn: 'root'
})

export class AuthRepositoryImp implements AuthRepository {

    constructor(
        private authService: AuthService
    ) {}

    //TODO: CAMBIAR EL TIPO USER A AUTH
    login( login: Auth): Observable<AccessToken> {
        return this.authService.login( login );
    }
}