import { Injectable, signal, WritableSignal } from "@angular/core";
import { ListarInfoDirector } from "../models/listarInfoDirector.model";

@Injectable({
    providedIn: 'root'
})

export class InfoDirectorSignal {

    // infoDirectorDefault: ListarInfoDirector = {
    //     codigoLocal: 0,
    //     CodigoProgramaAcademico: 0 ,
    //     CodigoSemestre: 0, 
    //     DescripcionLocal: '',
    //     DescripcionSemestre: '',
    //     NombreProgramaAcademico: ''
    // }

    // infoDirector: WritableSignal<ListarInfoDirector[]> = signal([])

}