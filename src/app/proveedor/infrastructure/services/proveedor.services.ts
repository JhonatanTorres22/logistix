import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Proveedor, ProveedorCrear, ProveedorEditar, ProveedorEliminar } from "../../domain/models/proveedor,model";
import { ProveedorDataArrayDTO } from "../dto/proveedor.dto";
import { ProveedorMapper } from "../../domain/mappers/proveedor.mapper";

@Injectable({
    providedIn: 'root'
})

export class ProveedorService {

    private urlAPi: string
    private urlListar: string
    private urlCrear: string
    private urlEditar: string
    private urlEliminar: string

    constructor(
        private http: HttpClient
    ) {
        this.urlAPi = environment.EndPoint
        this.urlListar = '/api/Proveedor/Listar';
        this.urlCrear = '/api/proveedor/Insertar';
        this.urlEditar = '/api/Proveedor/Actualizar';
        this.urlEliminar = '/api/Proveedor/Eliminar';
    }

    obtenerProveedor = (): Observable<Proveedor[]> => {
        return this.http.get<ProveedorDataArrayDTO>(this.urlAPi + this.urlListar)
            .pipe(map(api => api.data.map(ProveedorMapper.toDomain)));
    }

    crearProveedor = (proveedor: ProveedorCrear): Observable<void> => {
        const newProveedorAPI = ProveedorMapper.toApiCrear(proveedor);
        return this.http.post<void>(this.urlAPi + this.urlCrear, newProveedorAPI);
    }

    editarProveedor = (proveedor: ProveedorEditar): Observable<void> => {
        const editProveedorAPI = ProveedorMapper.toApiEditar(proveedor);
        return this.http.put<void>(this.urlAPi + this.urlEditar, editProveedorAPI);
    }

    eliminarProveedor = (proveedor: ProveedorEliminar): Observable<void> => {
        const eliminarProveedorAPI = ProveedorMapper.toApiEliminar(proveedor);
        return this.http.delete<void>(this.urlAPi + this.urlEliminar, { body: eliminarProveedorAPI });  
    }
}