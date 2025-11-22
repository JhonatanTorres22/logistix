import { Injectable } from "@angular/core";
import { ProveedorService } from "../services/proveedor.services";
import { Observable } from "rxjs";
import { Proveedor, ProveedorCrear, ProveedorEditar, ProveedorEliminar } from "../../domain/models/proveedor.model";
import { ProveedorRepository } from "../../domain/repositories/proveedor.repository";

@Injectable({
    providedIn: 'root'
})

export class ProveedorRepositoryImpl implements ProveedorRepository {

    constructor(
        private proveedorService: ProveedorService
    ) {}
    obtener(): Observable<Proveedor[]> {
        return this.proveedorService.obtenerProveedor()
    }
    crear(proveedor: ProveedorCrear): Observable<void> {
        return this.proveedorService.crearProveedor( proveedor )
    }

    editar(proveedor: ProveedorEditar): Observable<void> {
        return this.proveedorService.editarProveedor( proveedor )
    }

    eliminar(proveedor: ProveedorEliminar): Observable<void> {
        return this.proveedorService.eliminarProveedor( proveedor )
    }
}