import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MensajeriaFlujoNavegacionComponent } from '../mensajeria-flujo-navegacion/mensajeria-flujo-navegacion.component';

@Component({
  selector: 'mensajeria-response',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    QuillEditorComponent,
    UiButtonComponent,
    MensajeriaFlujoNavegacionComponent
  ],
  templateUrl: './mensajeria-response.component.html',
  styleUrl: './mensajeria-response.component.scss'
})
export class MensajeriaResponseComponent implements OnInit, OnDestroy {

  @ViewChild('selectDestinatario') selectDestinatario: MatSelect; 

  mensaje: string = '';
  showFormResponse = this.signal.showFormResponse;
  listaDestinatariosResponderA = this.signal.listaDestinatariosResponderA;
  listaDestinatariosResponderAflujo = this.signal.listaDestinatariosResponderAflujo;
  selectedDestinatarioResponderA = this.signal.selectedDestinatarioResponderA;

  paraRemitenteForm: FormGroup;
  constructor(
    private signal: MensajeriaSignal,
    private fb: FormBuilder
  ) {
    this.paraRemitenteForm = this.fb.group({
      destinatario: ['', [Validators.required]] 
    })
  }
  ngOnDestroy(): void {
    this.showFormResponse.set( false );
    this.listaDestinatariosResponderAflujo.set( this.signal.listaDestinatariosResponderADefault );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.selectDestinatario.open();
    }, 100);
    
  }

  change( event: any ) {
    console.log( event );
    
  }

  

}
