import { AuthDomainService } from "src/app/auth/domain/services/auth-domain.service";

export class RolUserId {
    static currentIdRolUser: number = JSON.parse(localStorage.getItem('currentRol')!).id;
}