import { Injectable, signal } from "@angular/core";
import { MallaPorCiclo, MallaPorCicloPlanEstudio } from "../models/malla-por-ciclo.model";

@Injectable({
    providedIn: 'root'
})

export class MallaPorCicloSignal {
    mallaPorCicloDefault :MallaPorCicloPlanEstudio[] = [];

    mallaPorCiclo = signal(this.mallaPorCicloDefault)


}