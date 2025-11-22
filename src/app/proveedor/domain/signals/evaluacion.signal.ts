import {  Injectable, signal } from "@angular/core";
import { Criterio } from "../models/evaluacion.model";

@Injectable({
    providedIn    : 'root'
})
export class EvaluacionSignal {
    criteriosListDefault : Criterio[] = [];
    criterioList = signal( this.criteriosListDefault );
}