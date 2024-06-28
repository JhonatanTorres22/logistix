import { Local } from "src/app/programas-academicos/domain/models/local.model";
import { MensajeriaArchivados, MensajeriaEnviados, MensajeriaInsertar, MensajeriaRecibidos, MensajeriaSelectMensaje, TipoMensaje } from "../models/mensajeria.model";
import { AsignacionPrograma, Asignacion } from "src/app/programas-academicos/domain/models/asignacion.model";
import { SemestreAcademico } from "src/app/programas-academicos/domain/models/semestre-academico.model";

export const mensajeriaInsertarDefault: MensajeriaInsertar = {
        asunto: '',
        emisorId: 0,
        leido: false,
        menssage: '',
        receptorId: 0,
        tipoMensaje: 0,
    }
    
export const locales: Local = {
        definicion: '',
        id: 0,
        latitud: 0,
        longitud: 0,
        nombre: '',
        usuarioId: 0
    }
    
export const semestre: SemestreAcademico = {
        codigo: '',
        condicion: '',
        id: 0,
        nombre: '',
        usuarioId: 0
    }
    
export const programa: AsignacionPrograma = {
        idDirector: 0,
        idPrograma: 0,
        locales: [],
        nombreDirector: '',
        nombrePrograma: '',
    }
    
export const asignacion: Asignacion = {
        idDecano: 0,
        idFacultad: 0,
        nombreDecano: '',
        nombreFacultad: '',
        programas: [],
    }
    
export const tipoMensaje: TipoMensaje = 'NO SELECCIONADO';


export const selectMensaje: MensajeriaSelectMensaje = { 
    id: 0,
    nombre: 'TORRES MENESES, JHONATAN JOEL',
    mensaje: 'sasdasdasd',
    fecha: '12/06/2024 08:23:00'
}

export const mensajesRecibidosDefault: MensajeriaRecibidos[] = [];
export const mensajesEnviadosDefault: MensajeriaEnviados[] = [];
export const mensajesArchivadosDefault: MensajeriaArchivados[] = [];

export const mensajesEntrada = [
    { 
        id: 1,
        nombre: 'TORRES MENESES, JHONATAN JOEL',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '12 May 24 10:16 AM',
        images: 'assets/images/user/avatar-1.png',
    },{ 
        id: 2,
        nombre: 'JOBS APPLE, STEVEN PAUL',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '13 Jul 24 08:23 AM',
        images: 'assets/images/user/avatar-2.png',
    },{ 
        id: 3,
        nombre: 'GATES MAXWELL, WILLIAM HENRY',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '06 Mar 24 08:23 AM',
        images: 'assets/images/user/avatar-3.png',
    },{ 
        id: 4,
        nombre: 'ZUCKERBERG KEMPNER MARK ELLIOT',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '23 Feb 24 08:23 AM',
        images: 'assets/images/user/avatar-4.jpg',
    },{ 
        id: 5,
        nombre: 'JOBS APPLE, STEVEN PAUL',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '13 Jul 24 08:23 AM',
        images: 'assets/images/user/avatar-2.png',
    },{ 
        id: 6,
        nombre: 'GATES MAXWELL, WILLIAM HENRY',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '06 Mar 24 08:23 AM',
        images: 'assets/images/user/avatar-3.png',
    },{ 
        id: 7,
        nombre: 'ZUCKERBERG KEMPNER MARK ELLIOT',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '23 Feb 24 08:23 AM',
        images: 'assets/images/user/avatar-4.jpg',
    },{ 
        id: 8,
        nombre: 'JOBS APPLE, STEVEN PAUL',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '13 Jul 24 08:23 AM',
        images: 'assets/images/user/avatar-2.png',
    },{ 
        id: 9,
        nombre: 'GATES MAXWELL, WILLIAM HENRY',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '06 Mar 24 08:23 AM',
        images: 'assets/images/user/avatar-3.png',
    },{ 
        id: 10,
        nombre: 'ZUCKERBERG KEMPNER MARK ELLIOT',
        mensaje: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.been the industry's standard dummy text ever since the 1500s.",
        fecha: '23 Feb 24 08:23 AM',
        images: 'assets/images/user/avatar-4.jpg',
    },
]

