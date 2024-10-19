import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnDestroy } from '@angular/core';
import { UiSelectComponent } from 'src/app/core/components/ui-select/ui-select.component';
import { UiSelect } from 'src/app/core/components/ui-select/ui-select.interface';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ListCursosEquivalenciaComponent } from '../list-cursos-equivalencia/list-cursos-equivalencia.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PlanEstudioRepository } from 'src/app/plan-de-estudios/domain/repositories/plan-estudio.repository';
import { MallaRepository } from 'src/app/plan-de-estudios/domain/repositories/malla.repository';
import { MatSelectChange } from '@angular/material/select';
import { AlertService } from 'src/app/demo/services/alert.service';
import { Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';

@Component({
  selector: 'select-plan-equivalencia',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    UiSelectComponent,
    ListCursosEquivalenciaComponent,
   ],
  templateUrl: './select-plan-equivalencia.component.html',
  styleUrl: './select-plan-equivalencia.component.scss'
})
export class SelectPlanEquivalenciaComponent implements OnDestroy {

  @Input() title: string = 'Plan de Estudios';
  @Input() label: string = 'Plan de Origen';
  @Input() options: UiSelect[] = [];
  @Input() origen: boolean = false;

  planEstudioOrigenSelect = this.planSignal.planEstudioOrigenSelect;
  planEstudioDestinoSelect = this.planSignal.planEstudioDestinoSelect;


  planEstudioOrigenOptionsSelect = this.planSignal.planEstudioOrigenOptionsSelect;
  planEstudioDestinoOptionsSelect = this.planSignal.planEstudioDestinoOptionsSelect;

  planSeleccionado: UiSelect = { value: '', text: '', disabled: false };
  cursosMalla: Malla[] = [];
  cursosMallaDestino: Malla[] = [];


  planOrigen: UiSelect[] = [
    { value: '1', text: 'Plan 1', disabled: false },
    { value: '2', text: 'Plan 2', disabled: false },
    { value: '3', text: 'Plan 3', disabled: false },
  ];

  planDestino: UiSelect[] = [
    { value: '1', text: 'Plan 1', disabled: false },
    { value: '2', text: 'Plan 2', disabled: false },
    { value: '3', text: 'Plan 3', disabled: false },
  ];

  formSelect: FormGroup

  constructor(
    private fb: FormBuilder,
    private repository: MallaRepository,
    private alert: AlertService,
    private planSignal: PlanEstudioSignal
  ) {
    
    
    this.formSelect = this.fb.group({ plan: new FormControl('') });

    effect( () => {
      const origen = this.planEstudioOrigenOptionsSelect();
      const destino = this.planEstudioDestinoOptionsSelect();

      if( origen.length === 0 || destino.length === 0 ) {
        return
      } else {
        console.log('origen', origen);
        console.log('destino', destino);

        this.origen ? this.listarCursosMallaDefault( origen[0] ) : this.listarCursosMallaDefault( destino[0] );

        return
      }


    }, { allowSignalWrites: true } )

  }
  ngOnDestroy(): void {
    // this.planEstudioOrigenOptionsSelect.set([]);
    // this.planEstudioDestinoOptionsSelect.set([]);
  }

  ngOnInit(): void {
    
  }

  listarCursosMalla = ({ value }: MatSelectChange ) => {
    const valueSelect: UiSelect = value
    console.log(value);
    this.repository.getMalla( parseInt( valueSelect.value )).subscribe({
      next: (malla) => {
        console.log(malla);
        this.origen ? this.planEstudioOrigenSelect.set(value) : this.planEstudioDestinoSelect.set(value);
        this.alert.showAlert(`Listando cursos del plan ${ value.text }`, 'success');
        this.cursosMalla = malla.sort( ( a, b) => a.cicloNumero - b.cicloNumero);;
      }, error: (error) => {
        console.error(error);
        this.alert.showAlert(`Ocurrió un error al obtener los cursos del plan ${ value.text }`, 'error');
      }
    });
  }

  listarCursosMallaDefault = ( value : UiSelect) => {
    const valueSelect: UiSelect = value
    console.log(value);
    this.repository.getMalla( parseInt( valueSelect.value )).subscribe({
      next: (malla) => {
        console.log(malla);
        this.origen ? this.planEstudioOrigenSelect.set(value) : this.planEstudioDestinoSelect.set(value);
        this.alert.showAlert(`Listando cursos del plan ${ value.text }`, 'success');
        this.cursosMalla = malla.sort( ( a, b) => a.cicloNumero - b.cicloNumero);
      }, error: (error) => {
        console.error(error);
        this.alert.showAlert(`Ocurrió un error al obtener los cursos del plan ${ value.text }`, 'error');
      }
    });
  }

  change = (event: any) => {
    console.log(event);
    // this.listarCursosMalla(event);
  }

}
