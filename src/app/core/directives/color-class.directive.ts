import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { MensajeriaArchivados, MensajeriaRecibidos } from 'src/app/mensajeria/domain/models/mensajeria.model';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';

@Directive({
  selector: '[ColorClass]',
  standalone: true
})
export class ColorClassDirective implements AfterViewInit {

  @Input() mensaje: any
  mensajeSelect = this.mensajeriaSignal.selectMensaje;
  toDay: Date = new Date();


  constructor( private element: ElementRef, private mensajeriaSignal: MensajeriaSignal ) {
    
    
    // element.nativeElement.classList.add('bg-red-900');

   }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log( this.mensaje );
      this.obtenerColor();
    }, 300);
  }

   obtenerColor = () => {
    
    const fechaRecepcion = new Date( this.mensaje?.fecha ).getTime();
    const fechaVencimiento = new Date( this.mensaje?.fechaVencimiento ).getTime();

    const dias = ( fechaVencimiento -  fechaRecepcion ) /(1000*60*60*24 ) ;
    const diasVigente = ( fechaVencimiento -  this.toDay.getTime() ) /(1000*60*60*24 ) ;
    console.log( dias, parseFloat( diasVigente.toFixed(2) ) );
    console.log( dias / 2 );
    
    

    if( diasVigente <= (dias / 2) && diasVigente > 0 ) {
      this.element.nativeElement.classList.add('bg-yellow-200', 'text-yellow-900');
      this.element.nativeElement.textContent = 'Por vencer ' + this.element.nativeElement.textContent;
    
    }
    if ( diasVigente > (dias / 2) ) {
      this.element.nativeElement.classList.add('bg-green-200', 'text-green-900');
      this.element.nativeElement.textContent = 'Vence el ' + this.element.nativeElement.textContent;

      // this.element.nativeElement.innerHTML = 'Vence pronto'

    }

    if( diasVigente < 0 ) {
      // let nuevoParrafo = document.createElement("<li>");
      // nuevoParrafo.textContent = "Vencido";
      this.element.nativeElement.classList.add('bg-red-200', 'text-red-900');
      this.element.nativeElement.textContent = 'Venció el ' + this.element.nativeElement.textContent;
      // console.log( this.element.nativeElement.textContent );
      
      // this.element.nativeElement.append(nuevoParrafo);
      
    }
  }
}
