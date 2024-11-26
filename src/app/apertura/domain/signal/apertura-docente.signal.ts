import { Injectable, signal, WritableSignal } from "@angular/core";
import { DocenteExcel, ListarDocentes } from "../models/apertura-docente.model";

@Injectable({
    providedIn: 'root'
})

export class AperturaDocenteSignal{
    listarDocenteDefault: ListarDocentes[] = [];

    listarDocente: WritableSignal<ListarDocentes[]> = signal(this.listarDocenteDefault)

    docentesImportExcelDefault: DocenteExcel[] = [];
    docentesImportExcel = signal( this.docentesImportExcelDefault );

    selecteRol = signal( false )

    seleccionarDocenteDefault : ListarDocentes = {
        idDocente: 0,
        nombreApellido: "",
        idSemestre: 0,
        nombreSemestre: "",
        idLocal: 0,
        codigoInterno: "",
        grado1: "",
        grado2: "",
        discapacidad: false,
        fechaNacimiento: "",
        tipoDeDocumento: "",
        correoPersona: "",
        correoInstitucional: "",
        sexo: "",
        nombreLocal: "",
        numeroDocumento: "",
        numeroCelular: ""
    }

    seleccionarDocente : WritableSignal<ListarDocentes> = signal(this.seleccionarDocenteDefault)
}
