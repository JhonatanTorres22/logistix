import { Asignacion, AsignacionPrograma } from "src/app/programas-academicos/domain/models/asignacion.model";
import { SemestreAcademico } from "src/app/programas-academicos/domain/models/semestre-academico.model";


export interface Mensajeria {
    idMensaje: number
}


export type TipoMensaje = 'DAR ALTA A DIRECTOR DE ESCUELA' | 'VALIDAR PLAN DE ESTUDIOS' | 'NO SELECCIONADO';

export interface MensajeriaRecibidos {
    idMensaje: number,
    nombreTipoMensajeGrupo: string,
    nombreTipoMensaje: string,
    // tipoMensaje: TipoMensaje,
    asunto: string,
    mensaje: string,
    rolEmisor: string,
    emisor: string,
    receptor: string,
    fecha: string,
    leido: boolean
}

export type MensajeriaEnviados = Omit<MensajeriaRecibidos, 'rolEmisor'> & {
    rolReceptor: string
};
export type MensajeriaArchivados = MensajeriaRecibidos

export type MensajeriaCerrarArchivar = Pick<Mensajeria, 'idMensaje'> & {
    usuarioId: number
}

export type MensajeriaHistorialMensajes = Omit<MensajeriaRecibidos, 'nombreTipoMensajeGrupo' | 'nombreTipoMensaje' | 'leido'> & {
    archivo: string,
    rolReceptor: string,
    informacionAdicional: string,
    // idRolEmisor: number,
    // idRolReseptor: number
}

export interface MensajeriaLeerMensaje {
    idMensaje: number
}

export interface MensajeriaInsertar {
    tipoMensaje: number,
    asunto: string,
    emisorId: number,
    receptorId: number,
    menssage: string,
    leido: boolean,
    informacionAdicional: string,
    usuarioId: number
}



export interface MensajeriaInsertarData {
    facultad: Asignacion,
    programa: AsignacionPrograma
    semestre: SemestreAcademico
}

export interface MensajeriaDataAsignacion {
    asignacion: Asignacion,
    semestre: SemestreAcademico,
    tipoMensaje: TipoMensaje
}

export type MensajeriaResponderAlta = Pick<MensajeriaResponderAList, 'idMensaje' | 'idTipoMensajeRol'> & {

    idRolEmisor: number,
    idRolReceptor: number,
    mensaje: string,
    informacionAdicional: string,
    archivo: File

}

export interface MensajeriaNuevoMensajeList {
    idTipoMensajeRol: number,
    idUsuarioRol: number,
    flujoNavegacion: string,
    apellidosYnombres: string,
    descripcion: string,
    temporalidad: number,
    iniciaProceso: boolean,
    cierraProceso: boolean
}


export interface MensajeriaTipoGrupo {
    id: number,
    tipo: string
}


export interface MensajeriaEnviarNuevoMensaje  {

    idTipoMensajeRol: number,
    flujoNavegacion: string,
    asunto: string,
    idRolEmisor: number,
    idRolReceptor: number,
    mensaje: string,
    informacionAdicional: string,
    usuarioId: number

}


export type MensajeriaResponderAList = MensajeriaNuevoMensajeList & {
    idMensaje: number
}


export interface BackToMail {
    detailsContent: boolean;
    titleContent: boolean;
}

// export type MensajeriaResponder
// export interface MensajeriaSelectMensaje {
//     id: number,
//     nombre: string,
//     mensaje: string,
//     fecha: string
// }