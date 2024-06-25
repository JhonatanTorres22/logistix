import { CicloCrearDTO, CicloDTO, CicloEditarDTO, CicloEliminarDTO } from "../../infraestructure/dto/ciclo.dto";
import { Ciclo, CicloCrear, CicloEliminar } from "../models/ciclo.model";
import { RolUserId } from "src/app/core/mappers/rolUserId";

export class CicloMapper {

    static fromApiToDomain( param: CicloDTO): Ciclo {
        return {
            id: param.codigo,
            cicloNumero: param.denominacionResumida,
            cicloLetra: param.denominacionExtendida,
            definicion: param.definicion
        }
    }

    static fromDomainToApiCrear( param: CicloCrear ): CicloCrearDTO {
        return {
            denominacionResumida: param.cicloNumero,
            denominacionExtendida: param.cicloLetra,
            definicion: param.definicion,
            usuario: RolUserId.currentIdRolUser.toString()
        }
    }

    static fromDomainToApiEliminar( param: CicloEliminar ): CicloEliminarDTO {
        return {
            codigo: param.id,
            usuario: RolUserId.currentIdRolUser.toString()
        }
    }

    static fromDomainToApiEditar( param: Ciclo ): CicloEditarDTO {
        return {
            codigo: param.id,
            denominacionResumida: param.cicloNumero,
            denominacionExtendida: param.cicloLetra,
            definicion: param.definicion,
            usuario:RolUserId.currentIdRolUser.toString()
        }
    }

}