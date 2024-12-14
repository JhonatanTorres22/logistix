import { Injectable, signal, WritableSignal } from "@angular/core";
import { DocenteExcel, ListarCursosDominioDocente, ListarDisponibilidadDocente, ListarDocenteNoAsignado, ListarDocentes } from "../models/apertura-docente.model";

@Injectable({
    providedIn: 'root'
})

export class AperturaDocenteSignal{
    listarDocenteDefault: ListarDocentes[] = [];
    listarDocente: WritableSignal<ListarDocentes[]> = signal(this.listarDocenteDefault)

    listarCursosDominioDocenteDefault : ListarCursosDominioDocente[] = [];
    listarCursosDominioDocente : WritableSignal<ListarCursosDominioDocente[]> = signal(this.listarCursosDominioDocenteDefault)

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
        primerGrado: "",
        segundoGrado: "",
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

    seleccionarDocente : WritableSignal<ListarDocentes> = signal(this.seleccionarDocenteDefault);

    editarDocente : WritableSignal<ListarDocentes> = signal(this.seleccionarDocenteDefault); 
    loadingDocente = signal<boolean>(false);

    /* DISPONIBILIDAD DOCENTE */
    renderizarAlSeleccionarDocente =signal( '' )
    listarDisponibilidadDocenteDefault : ListarDisponibilidadDocente[] = [];
    listarDisponibilidadDocente: WritableSignal<ListarDisponibilidadDocente[]> = signal(this.listarDisponibilidadDocenteDefault)


    seleccionarDocenteNoAsignadoefault: ListarDocenteNoAsignado = {
        idUsuarioRol: 0,
        nombreAp: "",
        numeroDocumento: ""
    }

    seleccionarDocenteNoAsignado : WritableSignal<ListarDocenteNoAsignado> = signal(this.seleccionarDocenteNoAsignadoefault)
    
    selectSemestre = signal(false)
    renderizarDisponibilidad = signal ( '' )

    idLocalSelect = signal (0)
}
