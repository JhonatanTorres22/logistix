import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Asignacion, AsignacionCambiarDecano, AsignacionEliminar, AsignacionProgramaCambiarDirector, AsignarNuevoPrograma } from "../models/asignacion.model";


export abstract class AsignacionRepository {
    abstract obtener( idSemestre: number ): Observable< Asignacion[] >;
    abstract insertar( newPrograma: AsignarNuevoPrograma ): Observable<void>;
    abstract eliminar( eliminarPrograma: AsignacionEliminar ): Observable<void>;
    abstract cambiarDirector( newDirector: AsignacionProgramaCambiarDirector ): Observable<void>
    abstract cambiarDecano( newDecano: AsignacionCambiarDecano ): Observable<void>
}