import { Injectable, signal, WritableSignal } from "@angular/core";
import { ListarAmbientes } from "../models/apertura-ambiente.model";

@Injectable({
    providedIn: 'root'
})
export class AperturaAmbienteSignal {
    ambienteDefault : ListarAmbientes = {
        idAmbiente: 0,
        nombreAmbiente: "",
        nombrePabellon: "",
        nivelAmbiente: 0,
        aforo: 0,
        discapacidad: false,
        local: "",
        tipoDeAmbiente: ""
    }
    listaAmbienteDefault : ListarAmbientes[] = [];
    listaAmbienteAnteriorDefault: ListarAmbientes[] = []
    
    listarAmbientes: WritableSignal<ListarAmbientes[]> = signal(this.listaAmbienteDefault);
    listarAmbienteAnterior: WritableSignal<ListarAmbientes[]> = signal(this.listaAmbienteAnteriorDefault)
    ambienteSelected = signal( this.ambienteDefault )

    cursosImportExcelDefault: ListarAmbientes[] = [];
    cursosImportExcel = signal( this.cursosImportExcelDefault );


    fileDefault: any = {
        files: []
    }

    file: WritableSignal<any> = signal( this.fileDefault )

    loadingImportAmbiente = signal<boolean>(false);

    renderizarPor = signal( '' );
}