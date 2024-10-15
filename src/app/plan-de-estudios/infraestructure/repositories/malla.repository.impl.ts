import { inject, Injectable } from "@angular/core";
import { MallaRepository } from "../../domain/repositories/malla.repository";
import { Observable } from "rxjs";
import { CursoMallaDesfasado, CursoMallaDesfasar, CursoMallaRenovado, CursoMallaRenovar, CursoMallaReordenar, CursoMallaRevertirDesfase, CursoMallaRevertirRenovacion, Malla, MallaDelete, MallaInsert } from "../../domain/models/malla.model";
import { MallaService } from "../services/malla.service";

@Injectable({
    providedIn: 'root'
})

export class MallaRepositoryImpl implements MallaRepository {
    

    private readonly service = inject( MallaService );
    
    getMalla(idPlan: number): Observable<Malla[]> {
        return this.service.getMalla(idPlan);
    }
    
    getMallaPreRequisitos(idPlan: number): Observable<Malla[]> {
        return this.service.getMallaPreRequisitos(idPlan);
    }
    
    getMallaEquivalencias(idPlan: number): Observable<Malla[]> {
        return this.service.getMallaEquivalencias(idPlan);
    }
    
    getCursoMallaRenovados(idPlan: number): Observable<CursoMallaRenovado[]> {
        return this.service.getMallaRenovados( idPlan );
    }
    
    insertMalla(malla: MallaInsert[]): Observable<void> {
        return this.service.insertMalla(malla);
    }
    
    deleteMalla(malla: MallaDelete[]): Observable<void> {
        return this.service.deleteMalla(malla);
    }
    
    renovarMalla(malla: CursoMallaRenovar): Observable<void> {
        return this.service.renovarMalla(malla);
    }
    
    reordenarMalla(malla: CursoMallaReordenar[]): Observable<void> {
        return this.service.reordenarMalla( malla );
    }
    
    revertirRenovacion(malla: CursoMallaRevertirRenovacion): Observable<void> {
        return this.service.revertirRenovacion( malla )
    }

    cursoMallaDesfasar(malla: CursoMallaDesfasar): Observable<void> {
        return this.service.desfasarMalla( malla );
    }

    getMallaDesfasados(idPlan: number): Observable<CursoMallaDesfasado[]> {
        return this.service.getMallaDesfasados( idPlan );
    }

    revertirDesfase(malla: CursoMallaRevertirDesfase): Observable<void> {
        return this.service.revertirDesfase( malla );
    }
    

}