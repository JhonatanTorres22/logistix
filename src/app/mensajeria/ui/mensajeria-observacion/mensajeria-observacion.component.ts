import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { ObservacionRepository } from 'src/app/panel-de-control/domain/repositories/observacion.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { TicketDetalleComponent } from "../../../panel-de-control/ui/tikets/ticket-detalle/ticket-detalle.component";

@Component({
  selector: 'mensajeria-observacion',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonComponent,
    TicketDetalleComponent
],
  templateUrl: './mensajeria-observacion.component.html',
  styleUrl: './mensajeria-observacion.component.scss'
})
export class MensajeriaObservacionComponent implements OnInit {

  selectMensaje = this.signal.selectMensaje;
  observacionSelect = this.observacionSignal.observacionSelect;
  constructor(
    private signal: MensajeriaSignal,
    private repository: ObservacionRepository,
    private observacionSignal: ObservacionSignal,
    private alert: AlertService,
  ) {

  }
  ngOnInit(): void {
    this.listarObservacion();
  }


  listarObservacion = () => {
    this.repository.listarxId( this.selectMensaje().idMensaje ).subscribe({
      next: ( observacion ) => {
        console.log( observacion );
        this.alert.showAlert('Listando detalle de la observación', 'success');
        this.observacionSelect.set( observacion[0] )
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener el detalle de la observación', 'error')
      }
    })
  }

}
