import { Component, effect, inject, OnInit } from '@angular/core';
import { DocenteListComponent } from './docente-list/docente-list.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { DocenteDisponibilidadHorarioComponent } from './docente-disponibilidad-horario/docente-disponibilidad-horario.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AperturaDocenteSignal } from '../../domain/signal/apertura-docente.signal';
import { CommonModule } from '@angular/common';
import { CursoAperturadoSignal } from '../../domain/signal/curso-aperturado.signal';
import { MatSelectChange } from '@angular/material/select';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { ListarInfoDirector } from 'src/app/auth/domain/models/listarInfoDirector.model';
import { AperturaAmbienteSignal } from '../../domain/signal/apertura-ambiente.signal';
import { ListarLocalFiltrado } from '../../domain/models/apertura-docente.model';

@Component({
  selector: 'app-apertura-docente',
  standalone: true,
  imports: [DocenteListComponent, SharedModule, DocenteDisponibilidadHorarioComponent, CommonModule],
  templateUrl: './apertura-docente.component.html',
  styleUrl: './apertura-docente.component.scss'
})
export class AperturaDocenteComponent implements OnInit {
  selectProgramaSeleccionado = this.cursoAperturadoSignal.selectProgramaSeleccionado
  renderizarAlSeleccionarDocente = this.docenteSignal.renderizarAlSeleccionarDocente
  seleccionarDocente = this.docenteSignal.seleccionarDocente;
  isEditable = true;
  private _formBuilder = inject(FormBuilder);
  formAsignacion: FormGroup;
  formDsiponibiidad: FormGroup;

  idSemestreSeleccionado: number;
  idLocalSelect = this.docenteSignal.idLocalSelect;
  currentInfoDirector = this.auth.currentInfoDirector;
  programaSeleccionado: ListarInfoDirector | null ;

  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  renderizar = this.ambienteSignal.renderizarPor
  selectSemestre = this.docenteSignal.selectSemestre
  renderizarDisponibilidad = this.docenteSignal.renderizarDisponibilidad
  constructor(
    private ambienteSignal : AperturaAmbienteSignal,
    private auth: AuthSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private docenteSignal: AperturaDocenteSignal
  ){
    effect(() => {
      if (this.renderizarAlSeleccionarDocente() == 'Renderizar') {
        this.formAsignacion.patchValue({inputStep1 : this.seleccionarDocente().idDocente})
      }
    }, { allowSignalWrites: true })


    this.formAsignacion = this._formBuilder.group({
      inputStep1: ['', [Validators.required, Validators.min(1)]],
    });
    this.formDsiponibiidad = this._formBuilder.group({
      asignacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formDsiponibiidad.patchValue({asignacion:1})
    if(this.localesFiltrados = []){
      this.selectSemestre.set(false)
    }
  }

  seleccionarSemestre = (event: MatSelectChange) => {
    this.idSemestreSeleccionado = event.value;
    this.updateLocalesFiltrados();
    this.idLocalSelect.set(0);
    this.mostrarListaDocente()
    this.selectProgramaSeleccionado.set(false)
  }

  seleccionarLocal = (event: MatSelectChange) => {;
    this.idLocalSelect.set(event.value)
    console.log(this.idLocalSelect());
    
    this.mostrarDisponibilidad()
  }
  
  localesFiltrados: ListarLocalFiltrado[] = [];
  updateLocalesFiltrados = () => {
    if (this.idSemestreSeleccionado) {
        this.localesFiltrados = this.currentInfoDirector()
            .filter(programa => programa.idSemestre === this.idSemestreSeleccionado)
            .map(programa => ({
                id: programa.codigoLocal, // Asegúrate de que `idLocal` existe en `programa`
                nombre: programa.DescripcionLocal // Asegúrate de que `DescripcionLocal` existe en `programa`
            }));
    } else {
        this.localesFiltrados = [];
    }
    this.idLocalSelect.set(0); // Reinicia el local seleccionado
};

  mostrarListaDocente =() => {
    if(this.idSemestreSeleccionado){
      this.programaSeleccionado = this.currentInfoDirector().find(programa =>
        programa.idSemestre == this.idSemestreSeleccionado
      ) || null
      this.selectSemestre.set(true); // Emitir señal
      if(this.programaSeleccionado){
        this.renderizar.set('Renderizar');
        this.selectSemestreLocal.set(this.programaSeleccionado);
      }
    }else{
      this.selectSemestre.set(false)
      this.selectProgramaSeleccionado.set(false);
    }
  }
  
  mostrarDisponibilidad = () => {
    if (this.idSemestreSeleccionado && this.idLocalSelect() > 0) {
      this.programaSeleccionado = this.currentInfoDirector().find(programa =>
          programa.idSemestre === this.idSemestreSeleccionado &&
          programa.codigoLocal === this.idLocalSelect()
      ) || null; // Si no se encuentra el programa, asigna null

      if (this.programaSeleccionado) {
          this.selectSemestreLocal.set(this.programaSeleccionado);
          this.selectProgramaSeleccionado.set(true); // Emitir señal
          this.renderizarDisponibilidad.set('RenderizarDisponibilidad')
      }
      console.log(this.programaSeleccionado);
      
      // this.docenteSignal.seleccionarDocente.set(this.docenteSignal.seleccionarDocenteDefault);
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
