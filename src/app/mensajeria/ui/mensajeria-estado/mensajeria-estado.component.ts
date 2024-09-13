import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaObservacionComponent } from '../mensajeria-observacion/mensajeria-observacion.component';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { MensajeriaRecibidos } from '../../domain/models/mensajeria.model';

@Component({
  selector: 'mensajeria-estado',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    MensajeriaObservacionComponent
   ],
  templateUrl: './mensajeria-estado.component.html',
  styleUrl: './mensajeria-estado.component.scss'
})
export class MensajeriaEstadoComponent implements OnInit {
  @Input() small: boolean = false;
  @Input() mensaje: MensajeriaRecibidos;
  @ViewChild('Observacion') Observacion: TemplateRef<any>;

  selectMensaje = this.signal.selectMensaje;
  observacionSelect = this.observacionSignal.observacionSelect;
  color: string = '';

  constructor(
    private modal: UiModalService,
    private signal: MensajeriaSignal,
    private observacionSignal: ObservacionSignal,
  ) {

  }
  ngOnInit(): void {
    if( this.small ) {
      this.color = this.mensaje.solucionConforme ? 'green' : 'red';
      return;
    }
    
    this.setColor();
    console.log( this.mensaje );
    if( this.mensaje.observacionResuelta ) {
      
      setTimeout(() => {
        this.showModalObservacion( this.Observacion );
      }, 500);
      
    }
  }

  showModalObservacion = ( template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: this.mensaje.observacionResuelta ? 'Observación' : 'Observación'
    }).afterClosed().subscribe( response => {
      console.log( response );
      
    })
  }
  
  setColor = () => {
    this.color = this.selectMensaje().solucionConforme ? 'green' : 'red';
  }

}
