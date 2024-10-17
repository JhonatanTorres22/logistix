import { Injectable } from "@angular/core";
import { CursoRepository } from "../../domain/repositories/curso.repository";
import { Observable } from "rxjs";
import { Curso, CursoAddPreRequisito, CursoBuscarPlan, CursoCrear, CursoDeletePreRequisito, CursoDesfasado, CursoDesfasar, CursoEditar, CursoEliminar, CursoEncontradoEnPlan, CursoRenovar, CursoRevertirDesfase, CursoRevertirRenovacion } from "../../domain/models/curso.model";
import { CursoService } from "../services/curso.service";
import { PlanEstudio } from "../../domain/models/plan-estudio.model";


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

      agregarMasive(cursos: CursoCrear[]): Observable<void> {
         return this.service.agregarMasive( cursos );
      }
      
      renovar(curso: CursoRenovar): Observable<void> {
         return this.service.renovar( curso );
      }

      desfasar(curso: CursoDesfasar): Observable<void> {
         return this.service.desfasar( curso );
      }

      revertirDesfase(curso: CursoRevertirDesfase): Observable<void> {
         return this.service.revertirDesfase( curso );
      }

      revertirRenovacion(curso: CursoRevertirRenovacion): Observable<void> {
         return this.service.revertirRenovacion( curso );
      }
      
      editar(curso: CursoEditar): Observable<void> {
         return this.service.editar( curso );
      }
      
      eliminar(curso: CursoEliminar): Observable<void> {
         return this.service.eliminar( curso );
      }

      eliminarMasivo(cursos: CursoEliminar[]): Observable<void> {
         return this.service.eliminarMasivo( cursos );
      }
      
      addPreRequisito(cursoPreRequisito: CursoAddPreRequisito): Observable<void> {
         return this.service.addPreRequisito( cursoPreRequisito )
      }

      deletePreRequisito(cursoPreRequisito: CursoDeletePreRequisito): Observable<void> {
         return this.service.deletePreRequisito( cursoPreRequisito )
      }

      buscarCursoEnPlanEstudios(idCurso: number): Observable<PlanEstudio[]> {
         return this.service.buscarCursoPlanEstudios( idCurso )
      }

      obtenerCursosDesfasados( idPrograma: number ): Observable<CursoDesfasado[]> {
         return this.service.obtenerCursosDesfasados( idPrograma )
      }

 }