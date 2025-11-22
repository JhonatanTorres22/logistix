import { Injectable, signal, WritableSignal } from "@angular/core";
import { Proveedor } from "../models/proveedor.model";

@Injectable({
    providedIn    : 'root'
})

export class ProveedorSignal {
    proveedorListDefault : Proveedor[] = [];

    proveedorDefault : Proveedor = {
        codigo: 0,
        tipo: '',
        nombreRs: '',
        ruc: '',
        direccionFiscal: '',
        evaluacion: false
    }

    proveedorSelect = signal( this.proveedorDefault );
    proveedorList = signal( this.proveedorListDefault );
}