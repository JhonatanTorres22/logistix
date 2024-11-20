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
        grupo: false
    }

    listarSeccionDefault: ListarSecciones = {
        ambiente: [],
        detalleObservacion: '',
        discapacidad: false,
        idAperturaSeccion: 0,
        nombreSeccion: '',
        nVacantes: 0
    }

    listarSeccionesDefault: ListarSecciones[] = [];

    listaFormatoDefault: ListarFormato[] = [];

    listaTipoAmbienteDefault: ListarTipoAmbiente[] = [];

    listaSecciones: WritableSignal<ListarSecciones[]> = signal(this.listarSeccionesDefault);
    seccionEdit: WritableSignal<ListarSecciones> = signal(this.listarSeccionDefault)
    listaFormato: WritableSignal<ListarFormato[]> = signal(this.listaFormatoDefault);
    listaTipoAmbiente: WritableSignal<ListarTipoAmbiente[]> = signal(this.listaTipoAmbienteDefault)

    formatoSeleccionado: WritableSignal<ListarFormato> = signal(this.formatoSeleccionadoDefault);
    tipoAmbienteSeleccionado: WritableSignal<ListarTipoAmbiente> = signal(this.tipoAmbienteSeleccionadoDefault)

    setSeccionEdit( seccion: ListarSecciones ) {
        this.seccionEdit.set( seccion );
    }
}