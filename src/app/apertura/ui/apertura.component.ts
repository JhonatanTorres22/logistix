import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, TemplateRef, WritableSignal } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiSelectComponent } from 'src/app/core/components/ui-select/ui-select.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioRepository } from 'src/app/plan-de-estudios/domain/repositories/plan-estudio.repository';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { LocalRepository } from 'src/app/programas-academicos/domain/repositories/local.repository';
import { LocalSignal } from 'src/app/programas-academicos/domain/signals/local.signal';
import { LeyendaPlanEstudioComponent } from './apertura-cursos/leyenda-plan-estudio/leyenda-plan-estudio.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AperturaCursosListComponent } from './apertura-cursos/apertura-cursos-list/apertura-cursos-list.component';
import { CursoAperturadoSignal } from '../domain/signal/curso-aperturado.signal';
import { AperturaCursosComponent } from './apertura-cursos/apertura-cursos.component';

@Component({
  selector: 'app-apertura',
  standalone: true,
  imports: [SharedModule, 
    UiButtonComponent,
    UiButtonIconComponent,
    CommonModule,UiSelectComponent, LeyendaPlanEstudioComponent, AperturaCursosComponent],
  templateUrl: './apertura.component.html',
  styleUrl: './apertura.component.scss'
})
export class AperturaComponent implements OnInit {
  listaSemestreLocal = this.cursoAperturadoSignal.listaSemestreLocal
  currentInfoDirector = this.auth.currentInfoDirector;
  idPrograma = this.planEstudioSignal.programaId;
  planesDeEstudio = this.planEstudioSignal.planesDeEstudio;
  renderizarPor = this.planEstudioSignal.renderizarPor;
  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private planEstudioSignal: PlanEstudioSignal,
    private repositoryPlanestudio: PlanEstudioRepository,
    private auth: AuthSignal,
    private localRepository: LocalRepository,
    private localSignal: LocalSignal,
    private alertService: AlertService,
    private modal: UiModalService
  ){
    console.log('renderizabndo...', this.renderizarPor() );
    
  }

  ngOnInit(): void {
    this.obtenerLocales();
    this.obtenerPlanesDeEstudio()
  } 


  obtenerLocales = () => {
    this.localRepository.obtener().subscribe({
      next: ( locales ) => {
        console.log(locales);
        this.localSignal.setLocalesList( locales ); 
      }, error: ( error ) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error, no se pudo listar los locales', 'error');
      }
    })
  }

  obtenerPlanesDeEstudio() {
    this.repositoryPlanestudio.obtener( this.idPrograma() ).subscribe({
      next: ( planes ) => {
        console.log( planes, 'planes de estudios' );
        this.planesDeEstudio.set( planes )
        // this.
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert('Ocurrió un error al obtener los planes de estudios', 'error', 6);
      }
    })
  }

  mostrarLeyendaPlanEstudio = (template: TemplateRef<any>) => {
    console.log('mostrar leyenda');
    
    this.modal.openTemplate({
      template,
      titulo: 'Leyenda Plan de Estudio'
    }).afterClosed().subscribe( response => {
      // console.log( response );
      if( response == 'cancelar' ) {
        console.log( response );
        return
      }
    });
  }
  


  idSemestreSeleccionado: number | null = null;
  localSeleccionado: string | null = null;
  localesFiltrados: string[] = [];
  programaSeleccionado: any = null; // Almacena el JSON seleccionado

  // Método para manejar la selección de semestre
  onSelectSemestre(event: MatSelectChange) {
    this.idSemestreSeleccionado = event.value;
    this.updateLocalesFiltrados();
    this.mostrarProgramaSeleccionado();
  }

    // Método para manejar la selección de local
    onSelectLocal(event: MatSelectChange) {
      this.localSeleccionado = event.value;
      this.mostrarProgramaSeleccionado();
    }

  // Método para actualizar los locales filtrados según el semestre seleccionado
  updateLocalesFiltrados() {
    if (this.idSemestreSeleccionado) {
      this.localesFiltrados = this.currentInfoDirector()
        .filter(programa => programa.idSemestre === this.idSemestreSeleccionado)
        .map(programa => programa.DescripcionLocal);
    } else {
      this.localesFiltrados = [];
    }
    this.localSeleccionado = null; // Reinicia el local seleccionado al cambiar de semestre
  }

  // Método para obtener semestres únicos
  getSemestresUnicos() {
    const semestresMap = new Map();
    this.currentInfoDirector().forEach(programa => {
      if (!semestresMap.has(programa.DescripcionSemestre)) {
        semestresMap.set(programa.DescripcionSemestre, programa);
      }
    });
    return Array.from(semestresMap.values());
  }

    // Método para mostrar el programa seleccionado según el semestre y el local
    mostrarProgramaSeleccionado() {
      if (this.idSemestreSeleccionado && this.localSeleccionado) {
        this.programaSeleccionado = this.currentInfoDirector().find(programa =>
          programa.idSemestre === this.idSemestreSeleccionado &&
          programa.DescripcionLocal === this.localSeleccionado
        );
        this.listaSemestreLocal.set(this.programaSeleccionado)
      } else {
        this.programaSeleccionado = null; // Limpia el programa seleccionado si no hay selección completa
      }
    } 
}
