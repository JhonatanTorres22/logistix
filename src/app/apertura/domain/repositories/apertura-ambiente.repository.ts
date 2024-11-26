import { Observable } from "rxjs";
import { EditarAmbiente, EliminarAmbiente, InsertarAmbiente, ListarAmbientes } from "../models/apertura-ambiente.model";

export abstract class AperturaAmbienteRepository{
    abstract obtenerAmbientexSemestre(idSemestre: number, idLocal: number): Observable<ListarAmbientes[]>
    abstract obtenerAmbiente(idLocal: number): Observable<ListarAmbientes[]>
    abstract eliminarAmbiente(eliminarAmbiente: EliminarAmbiente[]):Observable<void>
    abstract insertarAmbiente( insertarAmbiente: InsertarAmbiente[] ): Observable<void>
    abstract editarAmbiente( editarAmbiente:EditarAmbiente):Observable<void>
}