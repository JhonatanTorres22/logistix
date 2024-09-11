import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';

@Component({
  selector: 'opciones-filtro',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiInputComponent,
  ],
  templateUrl: './opciones-filtro.component.html',
  styleUrl: './opciones-filtro.component.scss'
})
export class OpcionesFiltroComponent {

  filtro: string = 'all'
  filtroSelect = this.signal.filtroSelect;
  buscador = this.signal.buscador;

  formBuscador: FormGroup;

  @ViewChild('btnBuscar') btnBuscar: ElementRef<MatButtonToggle>;

  constructor(
    private signal: ObservacionSignal,
    private fb: FormBuilder
  ) {
    this.formBuscador = this.fb.group({
      buscador: '',
    })
  }

  select = ( $event: any ) => {
    this.filtro = $event;
    if( $event == undefined ) {
      console.log( $event);
      return
    }
    if( $event !== 'search' ) {
      console.log( $event );
      this.formBuscador.setValue({ buscador: '' });
      this.buscador.set( ['Buscador', this.formBuscador.value.buscador] )
    }
    this.filtroSelect.update( value => {
      return $event
    } );
    // this.formBuscador.setValue({ buscador: '' });
    // this.buscador.set( ['Buscador', this.formBuscador.value.buscador] )
    console.log( $event);

  }

  buscar = () => {
    // console.log( this.btnBuscar );
    this.filtroSelect.set( this.filtro );
    this.filtro = 'search';
    this.buscador.set( ['Buscador', this.formBuscador.value.buscador] );

    
  }

}
