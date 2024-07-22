import { ListarInfoDirectorDTO } from "../../infraestructure/dto/listarInfoDirector.dto";
import { ListarInfoDirector } from "../models/listarInfoDirector.model";

export class ListarInfoDirectorMapper {
    static fromApiToDomain (param: ListarInfoDirectorDTO) : ListarInfoDirector {
        return {
            codigoLocal: param.codigoLocal,
            CodigoProgramaAcademico: param.CodigoProgramaAcademico,
            CodigoSemestre: param.CodigoSemestre,
            DescripcionLocal: param.DescripcionLocal,
            DescripconSemestre: param.DescripconSemestre,
            NombreProgramaAcademico: param.NombreProgramaAcademico

        }
    }
}