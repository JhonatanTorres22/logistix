import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";
import { SubCategoriaEliminarDTO, SubCategoriaInsertarDTO, SubCategoriaListarDTO } from "../../infraestructure/dto/subCategoria.dto";
import { SubCategoriaEliminar, SubCategoriaInsertar, SubCategoriaListar } from "../models/subCategoria.model";


export class SubCategoriaMapper {
    static fromApiToDomainListar( param: SubCategoriaListarDTO ): SubCategoriaListar {
        return {
            id: param.codigo,
            categoriaId: param.codigoObservacionCategoria,
            nombre: param.denominacion
        }
    }

    static fromDomainToApiInsertar( param: SubCategoriaInsertar ): SubCategoriaInsertarDTO {
        return {
            codigoObservacionCategoria: param.categoriaId,
            denominacion: param.nombre
        }
    }

    static fromDomainToEliminar( param: SubCategoriaEliminar ): SubCategoriaEliminarDTO {
        return {
            codigo: param.id,
        }
    }

    static fromDomainToDomainSelect( param: SubCategoriaListar ): UiSelect {
        return {
            disabled: false,
            text: param.nombre,
            value: param.id.toString()
        }
    }
}