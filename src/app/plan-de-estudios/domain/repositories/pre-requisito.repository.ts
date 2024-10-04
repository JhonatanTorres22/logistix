import { Observable } from "rxjs";
import { CursoMallaPreRequisitoDelete, CursoMallaPreRequisitoInsert, PreRequisitoDelete, PreRequisitoInsert } from "../models/pre-requisito.model";

export abstract class PreRequisitoRepository {
  abstract insertPreRequisito(param: PreRequisitoInsert): Observable<void>;
  abstract deletePreRequisito(param: PreRequisitoDelete): Observable<void>;

  abstract insertPreRequisitoMalla(param: CursoMallaPreRequisitoInsert): Observable<void>;
  abstract deletePreRequisitoMalla(param: CursoMallaPreRequisitoDelete): Observable<void>;

}