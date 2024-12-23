import { Component, OnInit } from '@angular/core';
import { ListarInfoDirector } from 'src/app/auth/domain/models/listarInfoDirector.model';
import { AperturaAmbienteSignal } from '../../domain/signal/apertura-ambiente.signal';
import { CursoAperturadoSignal } from '../../domain/signal/curso-aperturado.signal';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { RutasSignal } from 'src/app/core/signals/rutas.signal';
import { AperturaDocenteSignal } from '../../domain/signal/apertura-docente.signal';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatSelectChange } from '@angular/material/select';
import { ValidarHorarioSignal } from 'src/app/horario/domain/signal/validar-horario.signal';

@Component({
  selector: 'app-select-semestre-local',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './select-semestre-local.component.html',
  styleUrl: './select-semestre-local.component.scss'
})
export class SelectSemestreLocalComponent implements OnInit {

  idSemestreSeleccionado: number;
  localSeleccionado: string;
  localesFiltrados: string[] = [];
  programaSeleccionado: ListarInfoDirector | null ; // Almacena el JSON seleccionado
  renderizarCurso = this.cursoAperturadoSignal.renderizarPor
  renderizar = this.ambienteSignal.renderizarPor
  currentRuta = this.rutaSignal.currentRuta;
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  currentInfoDirector = this.auth.currentInfoDirector;
  idPrograma = this.planEstudioSignal.programaId;
  selectProgramaSeleccionado = this.cursoAperturadoSignal.selectProgramaSeleccionado

  renderizarValidarHorario = this.validarHorarioSignal.renderizarHorario

  constructor(
    private ambienteSignal : AperturaAmbienteSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private planEstudioSignal: PlanEstudioSignal,
    private auth: AuthSignal,
    private rutaSignal: RutasSignal,
    private docenteSignal: AperturaDocenteSignal,
    private validarHorarioSignal: ValidarHorarioSignal
  ){
    
  }

  ngOnInit(): void {
    if(this.localesFiltrados = []   ){
      this.selectProgramaSeleccionado.set(false)
    }
  }

  // Método para manejar la selección de semestre
  onSelectSemestre = (event: MatSelectChange) => {

    this.idSemestreSeleccionado = event.value;
    this.updateLocalesFiltrados();
    this.localSeleccionado = ''
    this.mostrarProgramaSeleccionado(); 
    this.selectProgramaSeleccionado.set(false)
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
      // this.selectProgramaSeleccionado.set(false)
    }
    this.localSeleccionado = ''; 
  }

  mostrarProgramaSeleccionado() {
    // Caso: Otras rutas (requieren semestre y local)
    if (this.idSemestreSeleccionado && this.localSeleccionado) {
        this.programaSeleccionado = this.currentInfoDirector().find(programa =>
            programa.idSemestre === this.idSemestreSeleccionado &&
            programa.DescripcionLocal === this.localSeleccionado
        ) || null; // Si no se encuentra el programa, asigna null

        if (this.programaSeleccionado) {
            this.selectSemestreLocal.set(this.programaSeleccionado);
            this.selectProgramaSeleccionado.set(true); // Emitir señal
        }

        // Acciones según la ruta actual
        this.currentRuta() === '/apertura/cursos'
            ? this.renderizarCurso.set('RenderizarCurso')
            :  this.currentRuta() === '/validar' 
            ? this.renderizarValidarHorario.set('ValidarHorario')
            : this.renderizar.set('Renderizar');

        this.docenteSignal.seleccionarDocente.set(this.docenteSignal.seleccionarDocenteDefault);
    } else {
        // Si falta el semestre o el local, limpiar estado
        this.programaSeleccionado = null;
        this.selectProgramaSeleccionado.set(false);
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
