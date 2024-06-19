import { Injectable } from "@angular/core";
import { TipoDocumento, Usuario } from '../models/usuario.model';
import { AbstractControl } from "@angular/forms";

export const DNI_MAXLENGHT: number = 8;
export const DNI_MINLENGHT: number = 8;
export const CE_MAXLENGHT: number = 9;
export const CE_MINLENGHT: number = 15;
// export let TIPO_DOCUMENTO: TipoDocumento = 'DNI';

@Injectable({
    providedIn: 'root'
})


export class UsuariosDomainService {
    
    listaDeUsuarios: Usuario[] = [];
    usuario!: Usuario;

    set setUsuario( usuario: Usuario ) {
        console.log(usuario);
        this.usuario = usuario;
    }
    
    set setUsuarios( usuarios: Usuario[]) {
        this.listaDeUsuarios = usuarios;
    }

    get getUsuario() {
        return { ...this.usuario }
    }

    get getListaDeUsuarios() {
        return [ ...this.listaDeUsuarios ] 
    }

    agregarUsuario = ( usuarioNuevo: Usuario ) => {
        this.listaDeUsuarios.push(usuarioNuevo)
    }

    editarUsuario = ( usuarioEditado: Usuario ) => {
        this.listaDeUsuarios.forEach( (usuarioParaEditar, index) => {
            const dataActualizadaDelUsuarioParaEditar = usuarioParaEditar.id == usuarioEditado.id ? usuarioEditado : undefined;

            this.listaDeUsuarios[index] = dataActualizadaDelUsuarioParaEditar!;
        })
    }

    

}