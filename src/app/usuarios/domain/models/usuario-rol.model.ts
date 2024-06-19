export class UsuarioRol {

    constructor(
        public id: number,
        public usuario: string,
        public rol: string,
        public alta: string,
        public estado: string
    ) {

    }

}

export class UsuarioRolAgregar {

    constructor(
        public idUsuario: number,
        public idRol: number,
        public usuarioId: number
    ) {
       
    }

}

export class UsuarioRolSuspender {
    constructor(
        public idRol: number,
        public usuarioId: number
    ) {}
}


export class UsuarioRolEliminar {
    constructor(
        public idRol: number,
        public usuarioId: number
    ) {}
}


export class UsuarioRolAlta {
    constructor(
        public idRol: number,
        public usuarioId: number
    ) {}
}