import { Injectable } from "@angular/core";
import { AperturaSeccionRepository } from "../../domain/repositories/apertura-secciones.repository";
import { AperturaSeccionService } from "../services/apertura-seccion.service";
import { Observable } from "rxjs";
import { AgregarSeccion, AgregarTipoAmbienteASeccion, EditarSeccion, EliminarSeccion, EliminarTipoAmbiente, ListarFormato, ListarSecciones, ListarTipoAmbiente } from "../../domain/models/apertura-seccion.model";

@Injectable({
    providedIn: 'root'
})

export class AperturaSeccionRespositoryImpl implements AperturaSeccionRepository {
    constructor(private service:AperturaSeccionService){}

    obtenerSecciones(idAperturaCurso: number): Observable<ListarSecciones[]> {
        return this.service.obtenerSeccionesAperturadas(idAperturaCurso)
    }
    insertarSecciones(secciones: AgregarSeccion): Observable<void> {
        return this.service.insertarSeccion(secciones)
    }
    obtenerFormato(): Observable<ListarFormato[]> {
        return this.service.obtenerFormato()
    }
    obtenerTipoAmbiente(idFormato: number): Observable<ListarTipoAmbiente[]> {
        return this.service.obtenerTipoAmbiente(idFormato)
    }

    editarSeccion(editar: EditarSeccion): Observable<void> {
        return this.service.editarSeccion(editar)
    }
    
    eliminarSeccion(eliminar: EliminarSeccion): Observable<void> {
        return this.service.eliminarSeccion(eliminar)
    }

    eliminarTipoAmbiente(eliminarTipoAmbiente: EliminarTipoAmbiente): Observable<void> {
        return this.service.eliminarTipoAmbiente(eliminarTipoAmbiente)
    }

    agregarTipoAmbienteASeccion(agregarTipoAmbiente: AgregarTipoAmbienteASeccion[]): Observable<void> {
        return this.service.agregarTipoAmbienteASeccion(agregarTipoAmbiente)
    }
}