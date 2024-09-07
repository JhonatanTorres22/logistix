export type Categoria = {
    id: number,
    nombre: string,
    abreviatura: string,
}

export type CategoriaListar = Categoria;

export type CategoriaEliminar = Pick<Categoria, 'id'>

export type CategoriaInsertar = Omit<Categoria, 'id'>


export interface IValidator {
    maxLength: number,
    minLength: number,
    expReg: RegExp,
    expRegInput: RegExp,
}