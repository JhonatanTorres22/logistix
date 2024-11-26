import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-mostrar-datos-docente',
  standalone: true,
  imports: [SharedModule, UiButtonComponent, UiLoadingProgressBarComponent, CommonModule],
  templateUrl: './mostrar-datos-docente.component.html',
  styleUrl: './mostrar-datos-docente.component.scss'
})
export class MostrarDatosDocenteComponent {

  seleccionarDocente = this.docenteSignal.seleccionarDocente

  constructor(
    private docenteSignal: AperturaDocenteSignal
  ){}
}
