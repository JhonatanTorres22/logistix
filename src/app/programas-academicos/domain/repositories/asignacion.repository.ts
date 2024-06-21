import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Asignacion, AsignacionEliminar, AsignarNuevoPrograma } from "../models/asignacion.model";


export abstract class AsignacionRepository {
    abstract obtener( idSemestre: number ): Observable< Asignacion[] >;
    abstract insertar( newPrograma: AsignarNuevoPrograma ): Observable<void>;
    abstract eliminar( eliminarPrograma: AsignacionEliminar ): Observable<void>;
}