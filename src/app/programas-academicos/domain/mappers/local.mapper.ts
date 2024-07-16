import { RolUserId } from "src/app/core/mappers/rolUserId";
import { LocalCrearDTO, LocalDTO, LocalEliminarDTO } from "../../infraestructure/dto/local.dto";
import { Local, LocalCrear, LocalEliminar } from "../models/local.model";

export class LocalMapper {

    static fromDomainToApi( param: Local): LocalDTO {
        return {
            codigo: param.id,
            nombre: param.nombre,
            definicion: param.definicion,
            latitud: param.latitud,
            longitud: param.longitud,
            usuario: param.usuarioId
        }
    }

    static fromApiToDomain( param: LocalDTO ): Local {
        return {
            id: param.codigo,
            nombre: param.nombre,
            definicion: param.definicion,
            latitud: param.latitud,
            longitud: param.longitud,
            usuarioId: param.usuario
        }
    }

    static fromDomainToApiCrear( param: LocalCrear ): LocalCrearDTO {
        // static fromDomainToApiCrear( param: Omit<Local, 'id'> ): Omit<LocalDTO, 'codigo'> {
    
        return {
             nombre: param.nombre,
             definicion: param.definicion,
             latitud: param.latitud,
             longitud: param.longitud,
             usuario: param.usuarioId
        }
    }

    static fromDomainToApiEliminar( param: LocalEliminar ): LocalEliminarDTO {
        return {
            codigo: param.id,
            usuario: param.usuarioId
        }
    }

}