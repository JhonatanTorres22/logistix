import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { SemestreAcademicoMapper } from "../../domain/mappers/semestre-academico.mapper";
import { SemestreAcademico, SemestreAcademicoCrear } from "../../domain/models/semestre-academico.model";
import { SemestreAcademicoCrearDTO, SemestreAcademicoDTO, SemestreAcademicoDataArrayDTO } from "../dto/semestre-academico.dto";


@Injectable({
    providedIn: 'root'
})

export class SemestreAcademicoLocalService {



    
    
}