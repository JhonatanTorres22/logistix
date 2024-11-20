import { ListarInfoDirectorDTO } from "../../infraestructure/dto/listarInfoDirector.dto";
import { ListarInfoDirector } from "../models/listarInfoDirector.model";

export class ListarInfoDirectorMapper {
    static fromApiToDomain (param: ListarInfoDirectorDTO) : ListarInfoDirector {
        return {
            codigoLocal: param.CodigoLocal,
            idProgramaAcademico: param.CodigoProgramaAcademico,
            idSemestre: param.CodigoSemestre,
            DescripcionLocal: param.DescripcionLocal,
            DescripcionSemestre: param.DescripcionSemestre,
            NombreProgramaAcademico: param.NombreProgramaAcademico

        }
    }
}