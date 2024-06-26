import { RolUserId } from "src/app/core/mappers/rolUserId";
import { FacultadCrearDTO, FacultadDTO, FacultadEliminarDTO } from "../../infraestructure/dto/facultad.dto";
import { Facultad, FacultadCrear, FacultadEliminar } from "../models/facultad.model";

export class FacultadMapper {
    static fromApiToDomain( param: FacultadDTO): Facultad {
        return {
            id: param.codigo,
            definicion: param.definicion,
            nombre: param.nombre,
            usuarioId: param.usuario
        }
    }

    static fromDomainToApi( param: Facultad ): FacultadDTO {
        return {

            codigo: param.id,
            definicion: param.definicion,
            nombre: param.nombre,
            usuario: RolUserId.currentIdRolUser
            
        }
    }

    static fromDomainToApiCrear( param: FacultadCrear ): FacultadCrearDTO {
        return {
            definicion: param.definicion,
            nombre: param.nombre,
            usuario: RolUserId.currentIdRolUser
        }
    }

    static formDomainToApiEliminar( param: FacultadEliminar ): FacultadEliminarDTO {
        return {
            codigo: param.id,
            usuario:RolUserId.currentIdRolUser
        }
    }
}