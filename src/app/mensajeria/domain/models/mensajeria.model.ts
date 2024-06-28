import { Asignacion, AsignacionPrograma } from "src/app/programas-academicos/domain/models/asignacion.model";
import { SemestreAcademico } from "src/app/programas-academicos/domain/models/semestre-academico.model";


export interface Mensajeria {

}


export type TipoMensaje = 'DAR ALTA A DIRECTOR DE ESCUELA' | 'VALIDAR PLAN DE ESTUDIOS' | 'NO SELECCIONADO';

export interface MensajeriaRecibidos {
    idMensaje: number,
    idTipoMensaje: number,
    tipoMensaje: TipoMensaje,
    asunto: string,
    mensajePreview: string,
    rolEmisor: string,
    emisor: string,
    receptor: string,
    fecha: string,
}

export type MensajeriaEnviados = MensajeriaRecibidos;
export type MensajeriaArchivados = MensajeriaRecibidos;



export interface MensajeriaInsertar {
    tipoMensaje: number,
    asunto: string,
    emisorId: number,
    receptorId: number,
    menssage: string,
    leido: boolean,
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

export interface MensajeriaSelectMensaje {
    id: number,
    nombre: string,
    mensaje: string,
    fecha: string
}