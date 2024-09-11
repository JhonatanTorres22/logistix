import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TicketDetalleComponent } from '../ticket-detalle/ticket-detalle.component';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

@Component({
  selector: 'ticket-modal',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TicketDetalleComponent,
    UiButtonComponent,
  ],
  templateUrl: './ticket-modal.component.html',
  styleUrl: './ticket-modal.component.scss'
})
export class TicketModalComponent {

  ticketSelect = this.signal.ticketSelect;

  constructor(
    private signal: ObservacionSignal,
    private alert: AlertService,
    private modal: UiModalService,
  ) {

  }

  onCierreConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea Forzar el Cierre?. Recuerde que al CERRAR el mensaje quedará ARCHIVADO con estado RECHAZADO')
      .then( isConfirm => {
        if( !isConfirm ) return;

        this.forzarCierre();

      })
  }

  forzarCierre = () => {
    this.alert.sweetAlert('success', 'Confirmado', 'El mensaje fue CERRADO y ARCHIVADO correctamente');
    this.modal.getRefModal().close();
  }

}
