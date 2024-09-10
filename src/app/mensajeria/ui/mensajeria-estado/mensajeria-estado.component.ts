import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaObservacionComponent } from '../mensajeria-observacion/mensajeria-observacion.component';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';

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
export class MensajeriaEstadoComponent {
  @Input() small: boolean = false;

  selectMensaje = this.signal.selectMensaje;
  observacionSelect = this.observacionSignal.observacionSelect;

  constructor(
    private modal: UiModalService,
    private signal: MensajeriaSignal,
    private observacionSignal: ObservacionSignal,
  ) {

  }

  showModalObservacion = ( template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: ``
    }).afterClosed().subscribe( response => {
      console.log( response );
      
    })
  }

}
