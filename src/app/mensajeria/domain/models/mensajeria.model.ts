import { Asignacion, AsignacionPrograma } from "src/app/programas-academicos/domain/models/asignacion.model";
import { SemestreAcademico } from "src/app/programas-academicos/domain/models/semestre-academico.model";


export interface Mensajeria {
    idMensaje: number
}


export type TipoMensaje = 'DAR ALTA A DIRECTOR DE ESCUELA' | 'VALIDAR PLAN DE ESTUDIOS' | 'NO SELECCIONADO';

export interface MensajeriaRecibidos {
    idMensaje: number,
    idTipoMensaje: number,
    tipoMensaje: TipoMensaje,
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
export type MensajeriaArchivados = MensajeriaRecibidos & {
    rolReceptor: string,
    archivo: string,
};

export type MensajeriaCerrarArchivar = Pick<Mensajeria, 'idMensaje'>

export type MensajeriaHistorialMensajes = MensajeriaRecibidos & {
    archivo: string,
    rolReceptor: string,
    informacionAdicional: string,
    idRolEmisor: number,
    idRolReseptor: number
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

export interface MensajeriaResponder {
    idMensaje: number,
    idRolEmisor: number,
    idRolReceptor: number,
    mensaje: string,
    informacionAdicional: string,
    // usuarioId: number
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

export interface MensajeriaNuevoMensajeList {
    idTipoMensajeRol: number,
    idUsuarioRol: number,
    responder: string,
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


export interface MensajeriaEnviarNuevoMensaje {
    // idTipoMensaje: 
}
// export interface MensajeriaSelectMensaje {
//     id: number,
//     nombre: string,
//     mensaje: string,
//     fecha: string
// }