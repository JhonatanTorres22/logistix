import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Asignacion } from "../models/asignacion.model";


export abstract class AsignacionRepository {
    abstract obtener( idSemestre: number ): Observable< Asignacion[] >
}