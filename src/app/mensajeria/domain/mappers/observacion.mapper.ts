import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface"
import { CategoriaListar, CategoriaInsertar, CategoriaEliminar } from "src/app/panel-de-control/domain/models/categoria.model"
import { CategoriaListarDTO, CategoriaInsertarDTO, CategoriaEliminarDTO } from "src/app/panel-de-control/infraestructure/dto/categoria.dto"


export class ObservacionMapper {
    
    static fromApiToDomainObservacionCategoria( param: CategoriaListarDTO ): CategoriaListar {
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