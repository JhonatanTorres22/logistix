// import { inject, Inject, Injectable } from "@angular/core";
// import { ObservacionRepository } from "../../domain/repositories/observacion.repository";
// import { Observable } from "rxjs";
// import { ObservacionCategoriaListar, ObservacionCategoriaInsertar, ObservacionCategoriaEliminar } from "../../domain/models/observacion.model";
// import { ObservacionService } from "../services/observacion.service";

// @Injectable({
//     providedIn: 'root'
// })


// export class ObservacionRepositoryImpl implements ObservacionRepository {

// private readonly service = inject(ObservacionService)
    
//     listarObservacionCategoria(): Observable<ObservacionCategoriaListar[]> {
//         return this.service.listarCategoria();
//     }

//     insertarObservacionCategoria( categoria: ObservacionCategoriaInsertar ): Observable<void> {
//         return this.service.insertarCategoria( categoria );
//     }

//     eliminarObservacionCategoria( categoria: ObservacionCategoriaEliminar ): Observable<void> {
//         return this.service.eliminarCategoria( categoria );
//     }

// }