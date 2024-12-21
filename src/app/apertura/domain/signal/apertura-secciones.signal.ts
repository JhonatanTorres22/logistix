import { Injectable, signal, WritableSignal } from "@angular/core";
import { ListarFormato, ListarSecciones, ListarTipoAmbiente } from "../models/apertura-seccion.model";

@Injectable({
    providedIn: 'root'
})

export class AperturaSeccionesSignal {
    formatoSeleccionadoDefault: ListarFormato = {
        descripcionFormato: '',
        idFormato: 0,
        nombreFormato: ''
    }

    tipoAmbienteSeleccionadoDefault: ListarTipoAmbiente = {
        idTipoAmbiente: 0,
        nombreTipoAmbiente: '',
        descripcionTipoAmbiente: '',
        grupo: false,
        teoria: false,
        practica: false
    }

    listarSeccionDefault: ListarSecciones = {
        detalleObservacion: '',
        discapacidad: false,
        idAperturaSeccion: 0,
        nombreSeccion: '',
        nVacantes: 0,
        idAmbienteTipoTeoria: 0,
        nombreAmbienteTeoria: "",
        idFormatoTeoria: 0,
        descripcionFormatoTeoria: "",
        idAmbienteTipoPractica: 0,
        nombreAmbientePractica: "",
        idFormatoPractica: 0,
        nombreFormatoPractica: "",
        numeroGrupos: 0
    }

    listarSeccionesDefault: ListarSecciones[] = [];

    listaFormatoDefault: ListarFormato[] = [];

    listaTipoAmbienteDefault: ListarTipoAmbiente[] = [];

    listaSecciones: WritableSignal<ListarSecciones[]> = signal(this.listarSeccionesDefault);
    seccionEdit: WritableSignal<ListarSecciones> = signal(this.listarSeccionDefault)

    listaFormato: WritableSignal<ListarFormato[]> = signal(this.listaFormatoDefault);
    listaFormatoTeorico: WritableSignal<ListarFormato[]> = signal(this.listaFormatoDefault);
    listaFormatoPractico: WritableSignal<ListarFormato[]> = signal(this.listaFormatoDefault);
    listaFormtatoNoRequire: WritableSignal<ListarFormato[]> = signal(this.listaFormatoDefault)

    listaTipoAmbiente: WritableSignal<ListarTipoAmbiente[]> = signal(this.listaTipoAmbienteDefault)
    listaTipoAmbienteTeorico: WritableSignal<ListarTipoAmbiente[]> = signal(this.listaTipoAmbienteDefault)
    listaTipoAmbientePractico: WritableSignal<ListarTipoAmbiente[]> = signal(this.listaTipoAmbienteDefault)
    listaTipoAmbienteExterno : WritableSignal<ListarTipoAmbiente[]> = signal(this.listaTipoAmbienteDefault)
    
    formatoSeleccionado: WritableSignal<ListarFormato> = signal(this.formatoSeleccionadoDefault);
    tipoAmbienteSeleccionado: WritableSignal<ListarTipoAmbiente> = signal(this.tipoAmbienteSeleccionadoDefault)

    setSeccionEdit( seccion: ListarSecciones ) {
        this.seccionEdit.set( seccion );
    }
}