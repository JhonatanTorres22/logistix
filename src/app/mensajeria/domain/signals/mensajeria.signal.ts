import { Injectable, signal } from "@angular/core";
import { MensajeriaArchivados, MensajeriaDataAsignacion, MensajeriaEnviados, MensajeriaHistorialMensajes, MensajeriaInsertar, MensajeriaRecibidos, TipoMensaje } from "../models/mensajeria.model";
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

    mensajeriaHistorialMensajesDefault: MensajeriaHistorialMensajes[] = []

    toggle = signal( true );
    mensajeriaInsertar = signal( mensajeriaInsertarDefault );
    mensajeriaInsertarDataAsignacion = signal( this.mensajeriaAsignacionDefault );
    mensajeriaModoTablet = signal( false );

    /* MENSAJES */
    mensajesRecibidos = signal ( mensajesRecibidosDefault );
    mensajesRecibidosTotal = signal( 0 );
    
    mensajesEnviados = signal ( mensajesEnviadosDefault );
    mensajesEnviadosTotal = signal( 0 );

    mensajesArchivados = signal ( mensajesArchivadosDefault );
    mensajesArchivadosTotal = signal( 0 );

    mensajesNoLeidos = signal( 0);
    selectMensaje = signal ( selectMensaje );

    mensajesHistorial = signal( this.mensajeriaHistorialMensajesDefault );

    renderizarMensajes = signal( '' );

    tipoBandeja = signal( 'Recibidos' );

    setSeleccionarMensaje = ( mensaje: MensajeriaRecibidos) => {
        this.selectMensaje.set( mensaje );
    }

    setSeleccionarMensajeDefault = () => {
        this.selectMensaje.set( selectMensaje );
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

    setMensajesHistorial = ( mensajesHistorial: MensajeriaHistorialMensajes[] ) => {
        this.mensajesHistorial.set( mensajesHistorial );
    }

    setMensajesHistorialDefault = () => {
        this.mensajesHistorial.set( this.mensajeriaHistorialMensajesDefault )
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