import { Observable } from "rxjs";
import { Rol } from "../models/rol.model";

export abstract class RolRepository {

    abstract obtenerRoles(): Observable<Rol[]>

}