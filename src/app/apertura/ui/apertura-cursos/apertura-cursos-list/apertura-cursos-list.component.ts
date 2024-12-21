import { Component, effect, OnInit, TemplateRef } from '@angular/core';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiButtonComponent } from "../../../../core/components/ui-button/ui-button.component";
import { AperturaCursosAddComponent } from '../apertura-cursos-add/apertura-cursos-add.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { MatIconModule } from '@angular/material/icon';
import { SeccionesAddComponent } from '../../apertura-secciones/secciones-add/secciones-add.component';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AperturaCursoRepository } from 'src/app/apertura/domain/repositories/apertura-curso.repository';
import { CommonModule } from '@angular/common';
import { EliminarCursoAperturado, ListaGrupoCursos, ListarCursosAperturados } from 'src/app/apertura/domain/models/apertura-curso.model';
import { SeccionesListComponent } from '../../apertura-secciones/secciones-list/secciones-list.component';
import { AperturaSeccionesComponent } from '../../apertura-secciones/apertura-secciones.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { CdkMenuModule } from '@angular/cdk/menu';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { render } from '@fullcalendar/core/preact';
@Component({
  selector: 'apertura-cursos-list',
  standalone: true,
  imports: [UiButtonComponent, MatIconModule,
    UiLoadingProgressBarComponent,
    UiButtonComponent,  CommonModule,
    SeccionesListComponent, AperturaCursosAddComponent, CdkMenuModule, SharedModule],
  templateUrl: './apertura-cursos-list.component.html',
  styleUrl: './apertura-cursos-list.component.scss'
})
export class AperturaCursosListComponent implements OnInit {

  loading: boolean = false;
  colores = [
   '#FFB3BA','#FFDFBA', '#D1BAFF','#BAFFB3','#C2F0C2','#BAE1FF','#FFBAE1','#F8D8B4','#F3C7E0','#FFFFBA',
  ];

  renderizarPor = this.cursoAperturadoSignal.renderizarPor;
  cursoAperturado = this.cursoAperturadoSignal.cursoAperturado;
  listaCursosAperturados = this.cursoAperturadoSignal.listaCursosAperturados
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  constructor(
    private authSignal: AuthSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private modal: UiModalService,
    private alertService: AlertService,
    private aperturaCursoRepository: AperturaCursoRepository
  ) {
    effect(() => {
      
      if(this.renderizarPor() == 'RenderizarCurso'){
        console.log(this.renderizarPor(), 'listando los cursos');
        
        this.obtenerCursosAperturados();
      }

      // setTimeout(() => {
this.renderizarPor.set('')
      // }, 400);
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.obtenerCursosAperturados();
    // this.asignarColores()
  }

  listarCursosPlanEstudio = (template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Agregar Cursos'
    }).afterClosed().subscribe(response => {
      // console.log( response );
      if (response == 'cancelar') {
        return
      }
    });
  }

  obtenerCursosAperturados = () => {
    this.loading = true;
    this.aperturaCursoRepository.obtenerCursosAperturados(this.selectSemestreLocal().codigoLocal,
      this.selectSemestreLocal().idProgramaAcademico,
      this.selectSemestreLocal().idSemestre)
      .subscribe({
        next: (cursosAperturados) => {
          // Agrupar cursos por 'denominacionResumen'
      const agrupado = cursosAperturados.reduce<Record<string, ListarCursosAperturados[]>>((acc, curso) => {
        const key = curso.denominacionResumen;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curso);
        return acc;
      }, {});

      // Convertir en un array para la vista
      const resultadoOrdenado: ListaGrupoCursos[] = Object.keys(agrupado)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Ordenamos por denominacionResumen
        .map((key) => ({
          denominacionResumen: key,
          cursos: agrupado[key],
        }));

      // Setear en el Signal la estructura agrupada
      this.listaCursosAperturados.set(resultadoOrdenado);
          this.loading = false;
        }, error: (error) => {
          this.alertService.showAlert('Ocurrió un error al listar los ciclos...', 'error');
          this.loading = false;

        }
      })
  }

  getColorPorPlan(idPlanDeEstudio: number): string {
    // Crear una lista de ID únicos de los planes de estudio en orden de aparición
    const planesDeEstudioUnicos = [
      ...new Set(this.listaCursosAperturados().flatMap(item => item.cursos.map(curso => curso.idPlanDeEstudio)))
    ];
    const index = planesDeEstudioUnicos.indexOf(idPlanDeEstudio);
    return this.colores[index];
  }


  listarSeccion = (template: TemplateRef<any>, curso: ListarCursosAperturados) => {
    this.cursoAperturado.set(curso)
    this.modal.openTemplate({
      template,
      titulo: `${curso.nombreCurso}`
    }).afterClosed().subscribe(response => {
      // console.log( response );

      if (response == 'cancelar') {
        console.log(response);
        return
      }
    });
  }

  openOptions = (event: any, curso: ListarCursosAperturados) => {
    this.cursoAperturado.set(curso)
  }

  eliminarConfirm = () => {
    this.loading = true;
    let cursosAEliminar: EliminarCursoAperturado[] = [];

    if (this.cursoAperturado().idAperturaCurso !== 0) {
        // Caso: Eliminar un curso específico
        cursosAEliminar.push({
            idAperturaCurso: this.cursoAperturado().idAperturaCurso,
            idUsuario: parseInt(this.authSignal.currentRol().id),
        });
    } else {
        // Caso: Eliminar todos los cursos
        cursosAEliminar = this.listaCursosAperturados().flatMap(cursoGrupo =>
            cursoGrupo.cursos.map(curso => ({
                idAperturaCurso: curso.idAperturaCurso,
                idUsuario: parseInt(this.authSignal.currentRol().id),
            }))
        );

        if (cursosAEliminar.length === 0) {
            this.alertService.showAlert('No hay cursos para eliminar.', 'info');
            return;
        }
    }

    const confirmMessage = this.cursoAperturado().idAperturaCurso !== 0
        ? `¿Está seguro de que desea eliminar el curso?`
        : 'Todos los cursos del Plan de Estudios serán ELIMINADOS, ¿Está seguro que desea continuar?';

    this.alertService.sweetAlert('question', 'Confirmar', confirmMessage).then(isConfirm => {
        if (!isConfirm) {
          this.cursoAperturado.set(this.cursoAperturadoSignal.cursoAperturadoDefault)
          this.loading = false;
          return;
        }
        this.eliminarCursoApertura(cursosAEliminar);
    });
};
  eliminarCursoApertura = (cursoAperturado: EliminarCursoAperturado[]) => {
    this.aperturaCursoRepository.eliminarCursoAperturado(cursoAperturado).subscribe({
      next: (value) => {
        this.alertService.showAlert('Curso eliminado correctamente', 'success', 5)
        this.obtenerCursosAperturados();
        this.cursoAperturado.set(this.cursoAperturadoSignal.cursoAperturadoDefault)
        this.loading = false;
      },error : (e) => {
        this.alertService.showAlert('Ocurrió un error al eliminar el curso', 'error', 5)
        this.cursoAperturado.set(this.cursoAperturadoSignal.cursoAperturadoDefault)
        this.loading = false;
      }
    })
  }
}
