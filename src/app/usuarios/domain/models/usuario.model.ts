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
        public usuario: number,
        // public usuarioEdicion: number
    ) {}

    // get fullName() {
    //     return `${ this.apellidoPaterno} ${ this.apellidoMaterno } ${this.nombres}`
    // }
}

export type UsuarioCrear = Omit<Usuario, 'id'>

export type TipoDocumento = 'DNI' | 'CE';

// export type UsuarioEditar = Omit<Usuario, 'id'>