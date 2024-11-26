import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiSelectComponent } from 'src/app/core/components/ui-select/ui-select.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { LocalSignal } from 'src/app/programas-academicos/domain/signals/local.signal';
import { LeyendaPlanEstudioComponent } from './apertura-cursos/leyenda-plan-estudio/leyenda-plan-estudio.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { CursoAperturadoSignal } from '../domain/signal/curso-aperturado.signal';
import { AperturaCursosComponent } from './apertura-cursos/apertura-cursos.component';
import { RutasSignal } from 'src/app/core/signals/rutas.signal';
import { AperturaAmbienteComponent } from './apertura-ambiente/apertura-ambiente.component';
import { ListarInfoDirector } from 'src/app/auth/domain/models/listarInfoDirector.model';
import { AperturaAmbienteSignal } from '../domain/signal/apertura-ambiente.signal';
import { AperturaDocenteComponent } from './apertura-docente/apertura-docente.component';

@Component({
  selector: 'app-apertura',
  standalone: true,
  imports: [SharedModule,
    AperturaDocenteComponent,
    UiButtonComponent,
    UiButtonIconComponent,
    CommonModule, UiSelectComponent,
    LeyendaPlanEstudioComponent,
    AperturaAmbienteComponent,
    AperturaCursosComponent],
  templateUrl: './apertura.component.html',
  styleUrl: './apertura.component.scss'
})
export class AperturaComponent implements OnInit {

  idSemestreSeleccionado: number;
  localSeleccionado: string;
  localesFiltrados: string[] = [];
  programaSeleccionado: ListarInfoDirector | null ; // Almacena el JSON seleccionado

  renderizar = this.ambienteSignal.renderizarPor
  currentRuta = this.rutaSignal.currentRuta;
  listaSemestreLocal = this.cursoAperturadoSignal.listaSemestreLocal
  currentInfoDirector = this.auth.currentInfoDirector;
  idPrograma = this.planEstudioSignal.programaId;

  constructor(
    private ambienteSignal : AperturaAmbienteSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private planEstudioSignal: PlanEstudioSignal,
    private auth: AuthSignal,
    private modal: UiModalService,
    private rutaSignal: RutasSignal,
  ) {
  }
  ngOnInit(): void {
  }

  mostrarLeyendaPlanEstudio = (template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Leyenda Plan de Estudio'
    }).afterClosed().subscribe(response => {
      // console.log( response );
      if (response == 'cancelar') {
        console.log(response);
        return
      }
    });
  }

  // Método para manejar la selección de semestre
  onSelectSemestre = (event: MatSelectChange) => {
    this.idSemestreSeleccionado = event.value;
    this.updateLocalesFiltrados();
    this.localSeleccionado = ''
    this.mostrarProgramaSeleccionado();    
  }

  // Método para manejar la selección de local
  onSelectLocal = (event: MatSelectChange) => {
    this.localSeleccionado = event.value;
    this.mostrarProgramaSeleccionado();
  }

  updateLocalesFiltrados() {
    if (this.idSemestreSeleccionado) {
      this.localesFiltrados = this.currentInfoDirector()
        .filter(programa => programa.idSemestre === this.idSemestreSeleccionado)
        .map(programa => programa.DescripcionLocal);
    } else {
      this.localesFiltrados = [];
    }
    // Reinicia la selección del local al cambiar de semestre
    this.localSeleccionado = ''; 
  }

  mostrarProgramaSeleccionado() {
    if (this.idSemestreSeleccionado && this.localSeleccionado) {
      this.programaSeleccionado = this.currentInfoDirector().find(programa =>
        programa.idSemestre === this.idSemestreSeleccionado &&
        programa.DescripcionLocal === this.localSeleccionado
      ) || null; // Si no se encuentra el programa, asigna null o un valor por defecto
    
      if (this.programaSeleccionado) {
        this.listaSemestreLocal.set(this.programaSeleccionado);
      }
      this.renderizar.set('Renderizar')
    } else {
      this.programaSeleccionado = null; // Limpia el programa seleccionado si no hay selección completa
    }
  }
  



  getSemestresUnicos() {
    const semestresMap = new Map();
    this.currentInfoDirector().forEach(programa => {
      if (!semestresMap.has(programa.DescripcionSemestre)) {
        semestresMap.set(programa.DescripcionSemestre, programa);
      }
    });
    return Array.from(semestresMap.values());
  }


}
