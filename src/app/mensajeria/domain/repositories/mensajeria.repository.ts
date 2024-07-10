import { Injectable } from "@angular/core";
import { MensajeriaArchivados, MensajeriaCerrarArchivar, MensajeriaEnviados, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaLeerMensaje, MensajeriaNuevoMensajeList, MensajeriaRecibidos, MensajeriaResponder } from "../models/mensajeria.model";
import { Observable } from "rxjs";
import { MensajeriaTipoDataArrayDTO } from "../../infraestructure/dto/mensajeria.dto";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";


export abstract class MensajeriaRepository {

    abstract insertar( mensaje: MensajeriaInsertar ): Observable<void>
    abstract obtenerMensajesRecibidos(): Observable<MensajeriaRecibidos[]>
    abstract obtenerMensajesEnviados(): Observable<MensajeriaEnviados[]>
    abstract obtenerMensajesArchivados(): Observable<MensajeriaArchivados[]>
    abstract obtenerMensajesHistorial( idMensaje: number ): Observable<MensajeriaHistorialMensajes[]>
    abstract responderMensaje( mensaje: MensajeriaResponder ): Observable<void>
    abstract leerMensaje( mensaje: MensajeriaLeerMensaje ): Observable<void>
    abstract cerrarArchivarMensaje( mensaje: MensajeriaCerrarArchivar ): Observable<void>
    abstract obtenerTipoMensajeGrupo(): Observable<UiSelect[]>
    abstract obtenerTipoMensaje( idTipoMensajeGrupo: number ): Observable<UiSelect[]>
    abstract nuevoMensajeA( tipoMensaje: number ): Observable< MensajeriaNuevoMensajeList[]>
    // abstract enviarNuevoMensaje(  )
    // abstract


}