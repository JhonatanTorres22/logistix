import { Observable } from "rxjs";
import { MallaPorCiclo, MallaPorCicloPlanEstudio } from "../models/malla-por-ciclo.model";

export abstract class MallaPorCicloRepository {
    abstract obtener (idProgramaAcademico:number, idCiclo : number ): Observable<MallaPorCicloPlanEstudio[]>
}