import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SelectPlanEquivalenciaComponent } from './components/select-plan-equivalencia/select-plan-equivalencia.component';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { UiSelect } from 'src/app/core/components/ui-select/ui-select.interface';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { EquivalenciaRepository } from '../../domain/repositories/equivalencia.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { parse } from 'date-fns';

@Component({
  selector: 'analisis-equivalencia-page',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SelectPlanEquivalenciaComponent,
    UiButtonComponent
  ],
  templateUrl: './analisis-equivalencia-page.component.html',
  styleUrl: './analisis-equivalencia-page.component.scss'
})
export class AnalisisEquivalenciaPageComponent implements OnInit {

  planesDeEstudio = this.planSignal.planesDeEstudio;
  planEstudioOrigenOptionsSelect = this.planSignal.planEstudioOrigenOptionsSelect;
  planEstudioDestinoOptionsSelect = this.planSignal.planEstudioDestinoOptionsSelect;
  planEstudioOrigenSelect = this.planSignal.planEstudioOrigenSelect;
  planEstudioDestinoSelect = this.planSignal.planEstudioDestinoSelect;

  convalidacion = this.planSignal.convalidacion;
  modoResumen = this.planSignal.modoResumen;

  constructor(
    private planSignal: PlanEstudioSignal,
    private equivalenciaRepository: EquivalenciaRepository,
    private alert: AlertService
  ) {
    effect( () => {
      const origen = this.planEstudioOrigenSelect();
      console.log('origen', origen);
      
      // this.planEstudioDestinoOptionsSelect.set( this.planEstudioOrigenOptionsSelect().filter( plan => plan.value !== origen.value ) )
      this.setOptionsSelect()
    }, { allowSignalWrites: true } )
  }

  ngOnInit(): void {
    
  }

  setOptionsSelect = () => {
    console.log('setOptionsSelect');
    
    const options: UiSelect[] = this.planesDeEstudio().map( plan => {
      return { value: plan.id.toString(), text: plan.nombre, disabled: false }
    } );
    this.planEstudioOrigenSelect().value == '' ? this.planEstudioOrigenOptionsSelect.set( options ) : '';

    const origenValue = this.planEstudioOrigenSelect().value;
    const origenIndex = options.findIndex(option => option.value === origenValue);

    // this.planEstudioDestinoOptionsSelect.set( options.filter( plan => plan.value !== this.planEstudioOrigenSelect().value ) );
    this.planEstudioDestinoOptionsSelect.set(
      options.filter((_, index) => index > origenIndex)
    );
  }

  simular = () => {
    console.log('simular');
    
    const origen = parseInt(this.planEstudioOrigenSelect().value);
    const destino = parseInt(this.planEstudioDestinoSelect().value);
    this.equivalenciaRepository.simularEquivalenciaMalla( origen, destino ).subscribe({
      next: (data) => {
        console.log(data);
        this.alert.showAlert('Simulación exitosa', 'success');
        this.convalidacion.set([
          {
            idMallaOrigen: 2173,
            idMallaDestino: 2233,
            porcentajeModificacion: 25,
          },
          {
            idMallaOrigen: 2174,
            idMallaDestino: 2234,
            porcentajeModificacion: 29,
          },
          {
            idMallaOrigen: 2175,
            idMallaDestino: 2235,
            porcentajeModificacion: 31,
          }
        ])
      }, error: (error) => {
        console.log(error);
        this.alert.showAlert('Ocurrió un error al simular la equivalencia', 'error');
      }
    })
  }

  resumen = () => {
    console.log('resumen');
    this.modoResumen.set( !this.modoResumen() );
  }

}
