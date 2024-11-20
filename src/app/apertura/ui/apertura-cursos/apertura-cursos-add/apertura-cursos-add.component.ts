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
import { UiSelectComponent } from 'src/app/core/components/ui-select/ui-select.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';


@Component({
  selector: 'apertura-cursos-add',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent, UiSelectComponent],
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
  listaSemestreLocal = this.cursoAperturadoSignal.listaSemestreLocal;

  constructor(
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

    this.obtener(this.cicloSeleccionado.id)
  }

  obtener = (idCiclo: number) => {
    this.cicloRepository.obtener(this.idPrograma(), idCiclo).subscribe({
      next: (malla) => {
        console.log(malla);
        this.mallaPorCiclo.set(malla)
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
        if (!this.cursosSeleccionados.some(c => c.idMalla === curso.idMalla)) {
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
    checked ? this.cursosSeleccionados.push(curso) : this.cursosSeleccionados = this.cursosSeleccionados.filter(local => local.idMalla != curso.idMalla);
  }

  marcarCurso = (id: number): boolean => {
    return this.cursosSeleccionados.some(curso => curso.idMalla === id)
  }

  deshabilitarMarcarCiclo(): boolean {
    return this.mallaPorCiclo().some(plan =>
      plan.cursos.every((curso: MallaPorCiclo) => this.cursosSeleccionados.some(c => c.idMalla === curso.idMalla))
    );
  }

  isCursoSeleccionado(selectedCurso: any): boolean {
    console.log(selectedCurso);
    // Recorre todos los planes y cursos disponibles
    return this.listaCursosAperturados().some(plan => 
      plan.cursos.some(curso => curso.codigoInternoCurso === selectedCurso.codigoInterno)
    );
  }
  onSubmit = () => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea aperturar los cursos?')
    .then( isConfirm  => {
      if(!isConfirm){return}
      const aperturaCursos = this.cursosSeleccionados.map(curso => ({
        idMalla: curso.idMalla,
        idLocal: this.listaSemestreLocal().codigoLocal,
        idUsuario: parseInt(this.auth.currentRol().id),
        idSemestre: this.listaSemestreLocal().idSemestre
      }));
      this.agregarCursoApertura(aperturaCursos)
    })
  }

  agregarCursoApertura = (agregarCursoApertura: AgregarCursoApertura[]) => {
    this.aperturaCursoRepository.agregarCursoApertura(agregarCursoApertura).subscribe({
      next: (data) => {
        this.alertService.sweetAlert('success', 'Correcto', 'Cursos aperturados exitosamente')

        this.renderizarPor.set('RenderizarCurso')
      }, error :(error) => {
        this.alertService.sweetAlert('error', 'Error', error)
      }
    })
  }
}
