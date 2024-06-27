import { Injectable } from "@angular/core";
import { MensajeriaRepository } from "../../domain/repositories/mensajeria.repository";
import { Observable } from "rxjs";
import { MensajeriaInsertar } from "../../domain/models/mensajeria.model";
import { MensajeriaService } from "../services/mensajeria.service";


@Injectable({
    providedIn: 'root'
})


export class MensajeriaRepositoryImpl implements MensajeriaRepository {

    constructor( private service: MensajeriaService ) {}

    insertar(mensaje: MensajeriaInsertar): Observable<void> {
        return this.service.insertar( mensaje );
    }

}