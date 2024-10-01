import { Injectable } from "@angular/core";
import { PreRequisitoDelete, PreRequisitoInsert } from "../../domain/models/pre-requisito.model";
import { Observable } from "rxjs";
import { PreRequisitoService } from "../services/pre-requisito.service";

@Injectable({
    providedIn: 'root'
})

export class PreRequisitoRepositoryImpl {
    
    constructor( private service: PreRequisitoService  ) {
        
    }
    
    insertPreRequisito(param: PreRequisitoInsert): Observable<void> {
        return this.service.insertPreRequisito(param);
    }
    
    deletePreRequisito(param: PreRequisitoDelete): Observable<void> {
        return this.service.deletePreRequisito(param);

    }
    
}