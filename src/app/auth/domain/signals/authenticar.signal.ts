import { Injectable, signal } from "@angular/core";
import { Navigation } from "src/app/@theme/types/navigation";

@Injectable({
    providedIn: 'root'
})

export class AuthenticarSignal {
    stepAuth =signal<'dni' | 'roles' | 'login'>('dni');
    dni = signal ('')
    rol = signal('')

    
}