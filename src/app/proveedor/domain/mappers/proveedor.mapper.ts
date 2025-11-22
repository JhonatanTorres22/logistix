import { ProveedorCrearDTO, ProveedorDTO, ProveedorEditarDTO, ProveedorEliminarDTO } from "../../infrastructure/dto/proveedor.dto";
import { Proveedor, ProveedorCrear, ProveedorEditar, ProveedorEliminar } from "../models/proveedor.model";

export class ProveedorMapper {
    static toDomain(dto: ProveedorDTO): Proveedor {
        return {
            codigo: dto.codigoProveedor,
            tipo: dto.tipoProveedor,
            nombreRs: dto.nombreRs,
            ruc: dto.ruc,
            direccionFiscal: dto.direccionFiscal,
            evaluacion: dto.evaluacion
        }
    }

    static toApiCrear (param : ProveedorCrear) : ProveedorCrearDTO {
        return {
            tipoProveedor: param.tipo,
            nombreRs: param.nombreRs,
            ruc: param.ruc,
            direccionFiscal: param.direccionFiscal
        }
    }

    static toApiEditar (param : ProveedorEditar) : ProveedorEditarDTO {
        return {
            codigoProveedor: param.codigo,
            tipoProveedor: param.tipo,
            direccionFiscal : param.direccionFiscal,
            nombreRs : param.nombreRs,
            ruc : param.ruc
        }
    }


    static toApiEliminar (param : ProveedorEliminar) : ProveedorEliminarDTO  {
        return {
            codigoProveedor: param.codigo
        }
    }
}