import { Injectable } from "@angular/core";
import { CursoRepository } from "../../domain/repositories/curso.repository";
import { Observable } from "rxjs";
import { Curso, CursoCrear, CursoEditar, CursoEliminar } from "../../domain/models/curso.model";
import { CursoService } from "../services/curso.service";


 @Injectable({
    providedIn: 'root'
 })

 export class CursoRepositoryImpl implements CursoRepository {

    constructor( private service: CursoService) {

    }

     obtenerPorPrograma( idPrograma: number ): Observable<Curso[]> {
        return this.service.obtenerPorPrograma( idPrograma );
     }

     agregar(curso: CursoCrear): Observable<void> {
        return this.service.agregar( curso );
     }

     editar(curso: CursoEditar): Observable<void> {
        return this.service.editar( curso );
     }
     
     eliminar(curso: CursoEliminar): Observable<void> {
        return this.service.eliminar( curso );
     }

 }