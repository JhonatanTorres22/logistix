import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AgregarCursoApertura } from 'src/app/apertura/domain/models/apertura-curso.model';
import { MallaPorCiclo, MallaPorCicloPlanEstudio } from 'src/app/apertura/domain/models/malla-por-ciclo.model';
import { AperturaCursoRepository } from 'src/app/apertura/domain/repositories/apertura-curso.repository';
import { MallaPorCicloRepository } from 'src/app/apertura/domain/repositories/malla-por-ciclo.repository';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { MallaPorCicloSignal } from 'src/app/apertura/domain/signal/curso-por-ciclo.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';

@Component({
  selector: 'apertura-cursos-add',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent,  UiLoadingProgressBarComponent],
  templateUrl: './apertura-cursos-add.component.html',
  styleUrl: './apertura-cursos-add.component.scss'
})
export class AperturaCursosAddComponent implements OnInit {
  listaCursosAperturados = this.cursoAperturadoSignal.listaCursosAperturados
  renderizarPor = this.cursoAperturadoSignal.renderizarPor;
  cursosSeleccionados: MallaPorCiclo[] = [];
  idPrograma = this.planEstudioSignal.programaId;
  cicloSeleccionado: Ciclo;
  listarCiclo = this.cicloSignal.cicloList
  mallaPorCiclo = this.mallaPorCicloSignal.mallaPorCiclo
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal;
  loading: boolean = false
  constructor(
    private modal: UiModalService,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private auth: AuthSignal,
    private mallaPorCicloSignal: MallaPorCicloSignal,
    private cicloRepository: MallaPorCicloRepository,
    private cicloSignal: CicloSingal,
    private alertService: AlertService,
    private planEstudioSignal: PlanEstudioSignal,
    private aperturaCursoRepository: AperturaCursoRepository,
  ) {}

  ngOnInit(): void {

  }

  cicloChange(event: any) {
    
    const cicloId = event.value; // Obtén el id del ciclo seleccionado
    this.cicloSeleccionado = this.listarCiclo().find(ciclo => ciclo.id === cicloId) || null!;
    if (this.cicloSeleccionado) {
      this.obtener(this.cicloSeleccionado.id);
    }
  }

  obtener = (idCiclo: number) => {
    this.loading = true
    this.cicloRepository.obtener(this.idPrograma(), idCiclo).subscribe({
      next: (malla) => {
        console.log(malla);
        this.mallaPorCiclo.set(malla);
        this.loading = false
      }, error: (e) => {
        this.alertService.showAlert('Ocurrió un error al listar los cursos','error')
        this.loading = false
      }
    })
  }

  isCicloSelected = (planId: number): boolean => {
    const cursosDelCiclo = this.mallaPorCiclo().find(plan => plan.idPlanDeEstudio === planId)?.cursos || [];
    return cursosDelCiclo.every((curso: { idMalla: any; }) => this.cursosSeleccionados.some(c => c.idMalla === curso.idMalla));
  };

  cicloMarcado = (plan: MallaPorCicloPlanEstudio, checked: boolean) => {
    if (this.deshabilitarMarcarCiclo() && checked) {
      alert("No puedes seleccionar otro ciclo si ya tienes uno completamente seleccionado.");
      return; // No permitimos seleccionar otro ciclo
    }
    if (checked) {
      plan.cursos.forEach((curso: MallaPorCiclo) => {
          // Verificamos si el curso ya está en la lista de cursos aperturados por nombre
          const cursoYaAperturado = this.listaCursosAperturados().some(aperturado => 
              aperturado.cursos.some(c => c.nombreCurso === curso.nombreCurso)
          );

          // Si el curso no está en la lista de cursos aperturados, lo agregamos
          if (!cursoYaAperturado) {
              this.cursoSeleccionado(curso, true);
          }
      });
  } else {
      plan.cursos.forEach((curso: MallaPorCiclo) => {
          this.cursoSeleccionado(curso, false);
      });
  }

  }

cursoSeleccionado = (curso: MallaPorCiclo, checked: boolean) => {
    if (checked) {
        const cursoDuplicado = this.cursosSeleccionados.some(c => c.nombreCurso === curso.nombreCurso);
        if (cursoDuplicado) {
            this.alertService.showAlert('Usted no podrá seleccionar este curso, porque ya hay otro creado con el mismo nombre', 'warning')
            checked = false
            return; // Salir sin agregar el curso
        }
        this.cursosSeleccionados.push(curso);
    } else {
        this.cursosSeleccionados = this.cursosSeleccionados.filter(local => local.idMalla != curso.idMalla);
    }
};

  marcarCurso = (id: number): boolean => {
    return this.cursosSeleccionados.some(curso => curso.idMalla === id)
  }

  deshabilitarMarcarCiclo(): boolean {
    return this.mallaPorCiclo().some(plan =>
      plan.cursos.every((curso: MallaPorCiclo) => this.cursosSeleccionados.some(c => c.idMalla === curso.idMalla))
    );
  }

  isCursoSeleccionado(selectedCurso: any): boolean {

    return this.listaCursosAperturados().some(plan => 
      plan.cursos.some(curso => curso.codigoInternoCurso === selectedCurso.codigoInterno)
    );
  }
  onSubmit = () => {
    this.loading = true
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea aperturar los cursos?')
    .then( isConfirm  => {
      if(!isConfirm){return}
      const aperturaCursos = this.cursosSeleccionados.map(curso => ({
        idMalla: curso.idMalla,
        idLocal: this.selectSemestreLocal().codigoLocal,
        idUsuario: parseInt(this.auth.currentRol().id),
        idSemestre: this.selectSemestreLocal().idSemestre
      }));
      this.agregarCursoApertura(aperturaCursos)
    })
  }

  agregarCursoApertura = (agregarCursoApertura: AgregarCursoApertura[]) => {
    this.aperturaCursoRepository.agregarCursoApertura(agregarCursoApertura).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Cursos aperturados exitosamente')
        this.renderizarPor.set('RenderizarCurso')
        this.modal.getRefModal()?.close('Obtener');
        this.loading = false
      }, error :(error) => {
        this.alertService.showAlert('Ocurrió un error al agregar los cursos', 'error')
        this.loading = false
      }
    })
  }
}
