import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RutasSignal {


    currentRuta = signal('');
    currentLayout = signal('vertical');

    setCurrentRuta = (ruta: string) => {
        this.currentRuta.set( ruta );
        const rutas = ['/mensajeria', '/plan-de-estudios/malla-curricular']
        rutas.includes( ruta ) ? this.setLayout('compact') : this.setLayout('vertical');
        // console.log(this.currentLayout());
        
    }

    setLayout = ( layout: string ) => {
        this.currentLayout.set( layout );
    }

}