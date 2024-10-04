import { Injectable } from "@angular/core";
import { CursoMallaPreRequisitoDelete, CursoMallaPreRequisitoInsert, PreRequisitoDelete, PreRequisitoInsert } from "../../domain/models/pre-requisito.model";
import { Observable } from "rxjs";
import { PreRequisitoService } from "../services/pre-requisito.service";
import { PreRequisitoRepository } from "../../domain/repositories/pre-requisito.repository";

@Injectable({
    providedIn: 'root'
})

export class PreRequisitoRepositoryImpl implements PreRequisitoRepository {
    
    constructor( private service: PreRequisitoService  ) {
        
    }
    insertPreRequisitoMalla(param: CursoMallaPreRequisitoInsert): Observable<void> {
        return this.service.insertPreRequisitoMalla(param);
    }
    deletePreRequisitoMalla(param: CursoMallaPreRequisitoDelete): Observable<void> {
        return this.service.deletePreRequisitoMalla(param);
    }
    
    insertPreRequisito(param: PreRequisitoInsert): Observable<void> {
        return this.service.insertPreRequisito(param);
    }
    
    deletePreRequisito(param: PreRequisitoDelete): Observable<void> {
        return this.service.deletePreRequisito(param);

    }
    
}