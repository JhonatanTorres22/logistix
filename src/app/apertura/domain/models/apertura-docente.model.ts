import { TipoDocumento } from "src/app/usuarios/domain/models/usuario.model";

export class ListarDocentes{
    constructor(
        public idDocente: number,
        public nombreApellido: string,
        public fechaNacimiento: string,
        public tipoDeDocumento: string,
        public numeroDocumento : string,
        public correoPersona: string,
        public correoInstitucional: string,
        public numeroCelular: string,
        public sexo: string,
        public idSemestre: number,
        public nombreSemestre: string,
        public idLocal: number,
        public nombreLocal: string,
        public codigoInterno: string,
        public grado1:string,
        public grado2: string,
        public discapacidad: boolean,
    ){}
}

export interface DocenteExcel{
    nombres: string,
    apellido_paterno: string,
    apellido_materno: string,
    documento: TipoDocumento,
    n_documento: string,
    sexo: string,
    fecha_nacimiento: string,
    correo_personal:string,
    correo_institucional: string,
    celular: number,
}