import { Injectable } from "@angular/core";
import { MensajeriaInsertar } from "../models/mensajeria.model";
import { Observable } from "rxjs";


export abstract class MensajeriaRepository {

    abstract insertar( mensaje: MensajeriaInsertar ): Observable<void>

    // abstract


}