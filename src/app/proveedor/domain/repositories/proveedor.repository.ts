import { Observable } from "rxjs";
import { Proveedor, ProveedorCrear, ProveedorEditar, ProveedorEliminar } from "../models/proveedor,model";

export abstract class ProveedorRepository {

    abstract obtener(): Observable<Proveedor[]>
    abstract crear( proveedor: ProveedorCrear): Observable<void>
    abstract editar( proveedor: ProveedorEditar ): Observable<void>
    abstract eliminar( proveedor: ProveedorEliminar ): Observable<void> 
}