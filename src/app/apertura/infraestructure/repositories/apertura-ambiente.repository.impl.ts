import { Injectable } from "@angular/core";
import { AperturaAmbienteRepository } from "../../domain/repositories/apertura-ambiente.repository";
import { Observable } from "rxjs";
import { EditarAmbiente, EliminarAmbiente, InsertarAmbiente, ListarAmbientes } from "../../domain/models/apertura-ambiente.model";
import { AperturaAmbienteService } from "../services/apertura-ambiente.service";

@Injectable({
    providedIn: 'root'
})

export class AperturaAmbienteRespositoryImpl implements AperturaAmbienteRepository {
    constructor(private serviceAmbiente: AperturaAmbienteService){}

    obtenerAmbientexSemestre(idSemestre: number, idLocal: number): Observable<ListarAmbientes[]> {
        return this.serviceAmbiente.obtenerAmbientesxSemestre(idSemestre, idLocal)
    }

    obtenerAmbiente(idLocal: number): Observable<ListarAmbientes[]> {
        return this.serviceAmbiente.obtenerAmbientes(idLocal)
    }
    
    insertarAmbiente(insertarAmbiente: InsertarAmbiente[]): Observable<void> {
        return this.serviceAmbiente.insertarAmbiente(insertarAmbiente)
    }
    eliminarAmbiente(eliminarAmbiente: EliminarAmbiente[]): Observable<void> {
        return this.serviceAmbiente.eliminarAmbiente(eliminarAmbiente)
    }

    editarAmbiente(editarAmbiente: EditarAmbiente): Observable<void> {
        return this.serviceAmbiente.editarAmbiente(editarAmbiente)
    }

}