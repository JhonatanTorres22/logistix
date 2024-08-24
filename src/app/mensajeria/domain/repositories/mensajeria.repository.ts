import { Injectable } from "@angular/core";
import {
    MensajeriaArchivados, MensajeriaCerrarArchivar,
    MensajeriaEnviados, MensajeriaEnviarNuevoMensaje,
    MensajeriaForzarCierre,
    MensajeriaHistorialMensajes, MensajeriaInsertar,
    MensajeriaLeerMensaje, MensajeriaNuevoMensajeList,
    MensajeriaRecibidos, MensajeriaResponderAList,
    MensajeriaResponderAlta } from "../models/mensajeria.model";
import { Observable } from "rxjs";
import { MensajeriaTipoDataArrayDTO } from "../../infraestructure/dto/mensajeria.dto";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";


export abstract class MensajeriaRepository {

    abstract insertar( mensaje: MensajeriaInsertar ): Observable<void>
    abstract obtenerMensajesRecibidos(): Observable<MensajeriaRecibidos[]>
    abstract obtenerMensajesEnviados(): Observable<MensajeriaEnviados[]>
    abstract obtenerMensajesArchivados(): Observable<MensajeriaArchivados[]>
    abstract obtenerMensajesHistorial( idMensaje: number ): Observable<MensajeriaHistorialMensajes[]>
    abstract responderMensajeAlta( mensaje: MensajeriaResponderAlta ): Observable<void>
    abstract leerMensaje( mensaje: MensajeriaLeerMensaje ): Observable<void>
    abstract cerrarArchivarMensaje( mensaje: MensajeriaCerrarArchivar ): Observable<void>
    abstract obtenerTipoMensajeGrupo(): Observable<UiSelect[]>
    abstract obtenerTipoMensaje( idTipoMensajeGrupo: number ): Observable<UiSelect[]>
    abstract nuevoMensajeA( tipoMensaje: number ): Observable< MensajeriaNuevoMensajeList[]>
    abstract enviarNuevoMensaje( mensaje: MensajeriaEnviarNuevoMensaje ): Observable<void>
    abstract responderMensajeA( idMensaje: number ): Observable<MensajeriaResponderAList[]>
    abstract forzarCierre( mensaje: MensajeriaForzarCierre ): Observable<void>
    // abstract


}