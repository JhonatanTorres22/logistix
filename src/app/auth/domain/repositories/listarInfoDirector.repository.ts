import { Observable } from "rxjs";
import { ListarInfoDirector } from "../models/listarInfoDirector.model";

export abstract class ListarInfoDirectorRepository {
    abstract obtener ( idRol: number): Observable<ListarInfoDirector[]>
}