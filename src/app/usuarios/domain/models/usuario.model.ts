import { omit } from "lodash";

export class Usuario {
    constructor(
        public nombres: string,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public tipoDocumento: TipoDocumento,
        public numeroDocumento: string,
        public sexo: string,
        public fechaNacimiento: string,
        public correoPersonal: string,
        public correoInstitucional: string,
        public celular: number,
        public imagenPerfil: string,
        public id: number,
        public usuarioId: number,
        // public usuarioEdicion: number
    ) {}

    // get fullName() {
    //     return `${ this.apellidoPaterno} ${ this.apellidoMaterno } ${this.nombres}`
    // }
}

export type UsuarioCrear = Omit<Usuario, 'id'>
export type UsuarioCrearMasivo = Omit<Usuario, 'id' | 'celular'> & {
    idRol: number,
    celular:string
}
export type TipoDocumento = 'DNI' | 'CE';

export interface UserImportExcel{
    nombres: string,
    apellido_paterno: string,
    apellido_materno: string,
    documento: TipoDocumento,
    n_documento: string,
    sexo: string,
    fecha_nacimiento: string,
    correo_personal:string,
    correo_institucional: string,
    celular: string,
    idRol: number
}
// export type UsuarioEditar = Omit<Usuario, 'id'>