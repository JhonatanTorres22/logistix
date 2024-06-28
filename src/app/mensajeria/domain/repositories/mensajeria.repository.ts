import { Injectable } from "@angular/core";
import { MensajeriaArchivados, MensajeriaEnviados, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaRecibidos } from "../models/mensajeria.model";
import { Observable } from "rxjs";


export abstract class MensajeriaRepository {

    abstract insertar( mensaje: MensajeriaInsertar ): Observable<void>
    abstract obtenerMensajesRecibidos(): Observable<MensajeriaRecibidos[]>
    abstract obtenerMensajesEnviados(): Observable<MensajeriaEnviados[]>
    abstract obtenerMensajesArchivados(): Observable<MensajeriaArchivados[]>
    abstract obtenerMensajesHistorial( idMensaje: number ): Observable<MensajeriaHistorialMensajes[]>

    // abstract


}