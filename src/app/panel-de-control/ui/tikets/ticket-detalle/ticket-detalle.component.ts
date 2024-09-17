import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, signal, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Observacion, ObservacionConforme, ObservacionPendiente, ObservacionResolver } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { ObservacionSignal } from 'src/app/panel-de-control/domain/signals/observacion.signal';
import { UiButtonComponent } from "../../../../core/components/ui-button/ui-button.component";
import { UiAlertComponent } from 'src/app/core/components/ui-alert/ui-alert.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { M } from 'msw/lib/core/HttpResponse-B07UKAkU';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';

@Component({
  selector: 'ticket-detalle',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    QuillEditorComponent,
    UiAlertComponent,
    UiButtonComponent
],
  templateUrl: './ticket-detalle.component.html',
  styleUrl: './ticket-detalle.component.scss'
})
export class TicketDetalleComponent implements OnDestroy {

  showEditor: boolean = false;
  showHistorial: boolean = false;
  formRating: FormGroup;
  @ViewChild('editor') editor: QuillEditorComponent;
  @Input() ticketDetalle: ObservacionPendiente | ObservacionConforme = {
    id: 0,
    mensajeId: 0,
    ticket: '',
    categoriaNombre: '',
    subCategoriaNombre: '',
    mensaje: '',
    estado: '',
    rol: '',
    usuario: '',
    fechaObservacion: '',
    mensajeResuelto: '',
    fechaResuelto: '',
    fechaConforme: '',
    historial: [],
  }

  ticketSelect = this.signal.ticketSelect;
  currentRol = this.authSignal.currentRol;
  mensajeRespuestaTicket = this.signal.mensajeRespuestaTicket;
  rating = this.signal.rating;
  conformeIsChecked = this.signal.conformeIsChecked;
  tipoBandeja = this.mensajeriaSignal.tipoBandeja;

  constructor(
    private signal: ObservacionSignal,
    private mensajeriaSignal: MensajeriaSignal,
    private authSignal: AuthSignal,
    private fb: FormBuilder,
  ) {
    this.formRating = this.fb.group({
      rating: [0, Validators.required]
    });
  }

  changeRating = () => {

    this.rating.set( parseInt( this.formRating.value.rating ) );

  }

  ngOnDestroy(): void {
    this.mensajeRespuestaTicket.set('');
    this.conformeIsChecked.set(false);
  }

}
