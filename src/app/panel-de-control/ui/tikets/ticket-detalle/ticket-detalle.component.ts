import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Observacion } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';

@Component({
  selector: 'ticket-detalle',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    QuillEditorComponent,

  ],
  templateUrl: './ticket-detalle.component.html',
  styleUrl: './ticket-detalle.component.scss'
})
export class TicketDetalleComponent {

  @Input() ticketDetalle: Observacion = {
    id: 0,
    mensajeId: 0,
    ticket: '',
    categoriaNombre: '',
    subCategoriaNombre: '',
    mensaje: '',
    fechaObservacion: ''
  }

  ticketSelect = this.signal.ticketSelect;
  currentRol = this.authSignal.currentRol;
  mensaje: string = '';
  constructor(
    private signal: ObservacionSignal,
    private authSignal: AuthSignal
  ) {

  }

}
