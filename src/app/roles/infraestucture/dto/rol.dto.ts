export interface RolDTO {
    codigo: number,
    nombre: string,
    alta:string,
    estado:string
}


export interface RolDataArrayDTO {
    data: RolDTO[]
}