import { Observable } from "rxjs";
import { AgregarSeccion, AgregarTipoAmbienteASeccion, EditarSeccion, EliminarSeccion, EliminarTipoAmbiente, ListarFormato, ListarSecciones, ListarTipoAmbiente } from "../models/apertura-seccion.model";

export abstract class AperturaSeccionRepository {
    abstract obtenerSecciones(idAperturaCurso: number): Observable<ListarSecciones[]>
    abstract insertarSecciones( secciones: AgregarSeccion[] ) : Observable<void>
    abstract agregarTipoAmbienteASeccion(agregarTipoAmbiente: AgregarTipoAmbienteASeccion[]): Observable<void>
    abstract obtenerFormato(): Observable<ListarFormato[]>
    abstract obtenerTipoAmbiente(idFormato:number): Observable<ListarTipoAmbiente[]>
    abstract editarSeccion ( editar:EditarSeccion ): Observable<void>
    abstract eliminarSeccion(eliminar: EliminarSeccion): Observable<void>
    abstract eliminarTipoAmbiente(eliminarTipoAmbiente: EliminarTipoAmbiente): Observable<void>
}