import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaHistorialMensajes } from '../../domain/models/mensajeria.model';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';

@Component({
  selector: 'mensajeria-card-archived-closed-approved',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './mensajeria-card-archived-closed-approved.component.html',
  styleUrl: './mensajeria-card-archived-closed-approved.component.scss'
})
export class MensajeriaCardArchivedClosedApprovedComponent {
  @Input() mensaje: MensajeriaHistorialMensajes;

  selectMensaje = this.signal.selectMensaje;

  constructor( private signal: MensajeriaSignal ) {

  }

}
