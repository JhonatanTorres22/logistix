import { ObservacionBase } from "src/app/panel-de-control/domain/models/obserbacion.model";

interface BuscadorStrategy {
    buscar( tipo: string, texto: string, lista: ObservacionBase[] ): ObservacionBase[];
}


export class BuscadorContext {

    public strategy: BuscadorStrategy;

    constructor( strategy: BuscadorStrategy ) {
        
        this.setStrategy( strategy );

    }

    setStrategy( strategy: BuscadorStrategy ) {
        this.strategy = strategy;
    }

    buscar( tipo: string, texto: string, lista: ObservacionBase[] ): ObservacionBase[] {
        return this.strategy.buscar( tipo, texto , lista);
    }
 
}

export class Buscar implements BuscadorStrategy {

    buscar( tipo: string, texto: string, lista: ObservacionBase[] ): ObservacionBase[] {
        let ticketFiltrado: ObservacionBase[] = [];
        const palabras = texto.toLowerCase().split(' ');
        const dataActual = lista;
        dataActual.map( tick => {
            let tickCopy = { ...tick, mensaje: '', historial: [] };
            
            const ticket = JSON.stringify(Object.values(tickCopy)).toLowerCase();

            const todasLasPalabrasPresentes = palabras.every(palabra => ticket.includes(palabra));
            if( todasLasPalabrasPresentes ) {
                ticketFiltrado.push( tick );
            }

        })

        return ticketFiltrado;
    }

}