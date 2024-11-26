import { Observable } from "rxjs";
import { ListarDocentes } from "../models/apertura-docente.model";

export abstract class DocenteRepository {
    abstract obtenerDocentes(idSemestre:number, idLocal: number): Observable<ListarDocentes[]>
}