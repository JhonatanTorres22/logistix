import { Injectable, signal } from "@angular/core";
import { MensajeriaDataAsignacion, MensajeriaInsertar, MensajeriaSelectMensaje, TipoMensaje } from "../models/mensajeria.model";
import { SemestreAcademico } from "src/app/programas-academicos/domain/models/semestre-academico.model";
import { Asignacion, AsignacionPrograma } from "src/app/programas-academicos/domain/models/asignacion.model";
import { Local } from "src/app/programas-academicos/domain/models/local.model";

import { asignacion, semestre, tipoMensaje, mensajeriaInsertarDefault, selectMensaje, mensajesEntrada } from "./mensajeria-default"

@Injectable({
    providedIn: 'root'
})

export class MensajeriaSignal {

    mensajeriaAsignacionDefault = {
        asignacion: asignacion,
        semestre: semestre,
        tipoMensaje: tipoMensaje
    }

    toggle = signal( true );
    mensajeriaInsertar = signal( mensajeriaInsertarDefault );
    mensajeriaInsertarDataAsignacion = signal( this.mensajeriaAsignacionDefault );
    mensajesList = signal ( mensajesEntrada )
    selectMensaje = signal ( selectMensaje )

    setToggle = () => {
        this.toggle.update( toggle => !toggle);
    }

    setMensajeriaInsertar = ( insertarMensaje: MensajeriaInsertar ) => {
        this.mensajeriaInsertar.set( insertarMensaje );
    }

    setMensajeriaInsertarDefault = () => {
        this.mensajeriaInsertar.set( mensajeriaInsertarDefault );
    }

    setMensajeriaDataAsignacion = ( mensajeriaDataAsignacion: MensajeriaDataAsignacion) => {
        this.mensajeriaInsertarDataAsignacion.set( mensajeriaDataAsignacion );
    }

    setMensajeriaDataAsignacionDefault = () => {
        this.mensajeriaInsertarDataAsignacion.set( this.mensajeriaAsignacionDefault );
        localStorage.setItem('mensajeriaData', JSON.stringify(this.mensajeriaAsignacionDefault))
    }

    setSeleccionarMensaje = ( mensaje: MensajeriaSelectMensaje) => {
        this.selectMensaje.set( mensaje );
    }







}