import { RolDTO } from "../../infraestucture/dto/rol.dto";
import { Rol } from "../models/rol.model";

export class RolMapper {
    static fromDomainToApi( param: Rol): RolDTO {
        return {
            codigo: param.id,
            nombre: param.rol
        }
    }


    static fromApiToDomain( param: RolDTO): Rol {
        return {
            id: param.codigo,
            rol: param.nombre
        }
    }
}