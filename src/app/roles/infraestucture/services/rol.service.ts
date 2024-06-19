import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Rol } from "../../domain/models/rol.model";
import { RolDataArrayDTO } from "../dto/rol.dto";
import { RolMapper } from "../../domain/mappers/rol.mapper";

@Injectable({
    providedIn: 'root'
})


export class RolService {
    
    private urlApi: string;  

    private urlObtenerRoles: string;
   

    constructor( private http: HttpClient) {
        this.urlApi = environment.EndPoint;
        this.urlObtenerRoles = 'api/Rol/Listar';
    }


    obtenerRoles = (): Observable<Rol[]> => {
        return this.http.get<RolDataArrayDTO>(this.urlApi + this.urlObtenerRoles)
            .pipe(map( apiRoles => apiRoles.data.map( RolMapper.fromApiToDomain) ))
    }

}