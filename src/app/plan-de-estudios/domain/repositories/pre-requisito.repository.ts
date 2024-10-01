import { Observable } from "rxjs";
import { PreRequisitoDelete, PreRequisitoInsert } from "../models/pre-requisito.model";

export abstract class PreRequisitoRepository {
  abstract insertPreRequisito(param: PreRequisitoInsert): Observable<void>;
  abstract deletePreRequisito(param: PreRequisitoDelete): Observable<void>;

}