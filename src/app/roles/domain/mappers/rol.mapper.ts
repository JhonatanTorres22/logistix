import { RolDTO } from "../../infraestucture/dto/rol.dto";
import { Rol } from "../models/rol.model";

export class RolMapper {
    static fromDomainToApi( param: Rol): RolDTO {
        return {
            codigo: param.id,
            nombre: param.rol,
            alta: param.alta,
            estado: param.estado,
            usuario: param.usuario
        }
    }


    static fromApiToDomain( param: RolDTO): Rol {
        return {
            id: param.codigo,
            rol: param.nombre,
            alta: param.alta,
            estado: param.estado,
            usuario: param.usuario
        }
    }
}