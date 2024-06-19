import { Observable } from "rxjs";
import { AccessToken, Auth } from "../models/auth.model";
import { User } from "src/app/@theme/types/user";



export abstract class AuthRepository {
    abstract login( login: Auth): Observable<AccessToken>
    //TODO: CAMBIAR EL TIPO USER A AUTH
}