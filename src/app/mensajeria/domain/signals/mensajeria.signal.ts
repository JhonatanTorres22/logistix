import { Injectable, signal } from "@angular/core";
import { MensajeriaArchivados, MensajeriaDataAsignacion, MensajeriaEnviados, MensajeriaInsertar, MensajeriaRecibidos, MensajeriaSelectMensaje, TipoMensaje } from "../models/mensajeria.model";
import { SemestreAcademico } from "src/app/programas-academicos/domain/models/semestre-academico.model";
import { Asignacion, AsignacionPrograma } from "src/app/programas-academicos/domain/models/asignacion.model";
import { Local } from "src/app/programas-academicos/domain/models/local.model";

import { 
    asignacion,
    semestre,
    tipoMensaje,
    mensajeriaInsertarDefault,
    selectMensaje,
    mensajesEntrada,
    mensajesRecibidosDefault,
    mensajesEnviadosDefault,
    mensajesArchivadosDefault,
} from "./mensajeria-default"

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

    /* MENSAJES */
    mensajesRecibidos = signal ( mensajesRecibidosDefault );
    mensajesRecibidosTotal = signal( 0 );
    
    mensajesEnviados = signal ( mensajesEnviadosDefault );
    mensajesEnviadosTotal = signal( 0 );

    mensajesArchivados = signal ( mensajesArchivadosDefault );
    mensajesArchivadosTotal = signal( 0 );

    mensajesNoLeidos = signal( 0);
    selectMensaje = signal ( selectMensaje );

    setSeleccionarMensaje = ( mensaje: MensajeriaSelectMensaje) => {
        this.selectMensaje.set( mensaje );
    }

    setMensajesRecibidos = ( mensajes: MensajeriaRecibidos[] ) => {
        this.mensajesRecibidos.set( mensajes );
        this.mensajesRecibidosTotal.set( mensajes.length );
        // mensajes.reduce( (cant, mensajes) =>{
        //     return mensajes.
        // },0 )
        // this.mensajesNoLeidos.set();
    }

    setMensajesEnviados = ( mensajes: MensajeriaEnviados[] ) => {
        this.mensajesEnviados.set( mensajes );
        this.mensajesEnviadosTotal.set( mensajes.length );
    }

    setMensajesArchivados = ( mensajes: MensajeriaArchivados[] ) => {
        this.mensajesArchivados.set( mensajes );
        this.mensajesArchivadosTotal.set( mensajes.length );
    }

    /* MENSAJES */

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

}