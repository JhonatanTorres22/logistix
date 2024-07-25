export interface RolDTO {
    codigo: number,
    nombre: string,
    alta:string,
    estado:string,
    usuario: string,
}


export interface RolDataArrayDTO {
    data: RolDTO[]
}