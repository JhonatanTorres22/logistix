import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class  FacultadMockService {

    private urlApi: string;
    private urlObtenerFacultades: string;
    private urlAgregarFacultad: string;
    private urlEditarFacultad: string;
    private urlEliminarFacultad: string;
    private urlObtenerFacultadesAsignadasAlSemestre: string;

    private urlAsignarFacultadToSemestre: string;

    constructor( http: HttpClient ) {
        this.urlApi = environment.EndPointSoap;

        this.urlObtenerFacultades = 'api/Facultad/Listar';
        this.urlAgregarFacultad = 'api/Facultad/Insertar';
        this.urlEditarFacultad = 'api/Facultad/Editar';
        this.urlEliminarFacultad = 'api/Facultad/Eliminar';

        this.urlObtenerFacultadesAsignadasAlSemestre = 'api/Facultad/ListarPorSemestre'
        this.urlAsignarFacultadToSemestre = 'api/Facultad/AsignarSemestre';
    }

    obtenerFacultades() {
        
    }


}