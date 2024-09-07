import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface"
import { CategoriaListarDTO, CategoriaInsertarDTO, CategoriaEliminarDTO } from "../../infraestructure/dto/categoria.dto"
import { CategoriaListar, CategoriaInsertar, CategoriaEliminar } from "../models/categoria.model"



export class CategoriaMapper {
    
    static fromApiToDomainCategoria( param: CategoriaListarDTO ): CategoriaListar {
        return {
            abreviatura: param.abreviatura,
            nombre: param.denominacion,
            id: param.codigo
        }
    }


    static fromDomainToApiCategoriaInsertar( param: CategoriaInsertar ): CategoriaInsertarDTO {
        return {
            abreviatura: param.abreviatura,
            denominacion: param.nombre
        }
    }

    static fromDomainToApiCategoriaEliminar( param: CategoriaEliminar ): CategoriaEliminarDTO {
        return {
            codigo: param.id
        }
    }

    static fromDomainToDomainSelect( param: CategoriaListar ): UiSelect {
        return {
            disabled: false,
            text: param.nombre,
            value: param.id.toString()
        }
    }
}