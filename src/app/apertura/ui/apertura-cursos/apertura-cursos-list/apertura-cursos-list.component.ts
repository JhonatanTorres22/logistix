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
@Component({
  selector: 'apertura-cursos-list',
  standalone: true,
  imports: [UiButtonComponent, MatIconModule, SeccionesAddComponent,
    UiLoadingProgressBarComponent,
    UiButtonComponent, UiCardNotItemsComponent, CommonModule,
    AperturaSeccionesComponent,
    SeccionesListComponent, AperturaCursosAddComponent, CdkMenuModule, SharedModule],
  templateUrl: './apertura-cursos-list.component.html',
  styleUrl: './apertura-cursos-list.component.scss'
})
export class AperturaCursosListComponent implements OnInit {

  loading = true;
  colores = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFB3', '#BAE1FF',
    '#D1BAFF', '#FFBAE1', '#C2F0C2', '#F3C7E0', '#F8D8B4',
  ];

  renderizarPor = this.cursoAperturadoSignal.renderizarPor;
  cursoAperturado = this.cursoAperturadoSignal.cursoAperturado;
  listaCursosAperturados = this.cursoAperturadoSignal.listaCursosAperturados
  listaSemestreLocal = this.cursoAperturadoSignal.listaSemestreLocal
  constructor(
    private authSignal: AuthSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private modal: UiModalService,
    private alertService: AlertService,
    private aperturaCursoRepository: AperturaCursoRepository
  ) {
    effect(() => {
      console.log('rendizando por',this.renderizarPor());
      
      if(this.renderizarPor() == 'RenderizarCurso'){
        this.obtenerCursosAperturados();
      }

      this.renderizarPor.set('')
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
        console.log(response);
        return
      }
    });
  }

  obtenerCursosAperturados = () => {
    this.aperturaCursoRepository.obtenerCursosAperturados(this.listaSemestreLocal().codigoLocal,
      this.listaSemestreLocal().idProgramaAcademico,
      this.listaSemestreLocal().idSemestre)
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
      console.log(this.listaCursosAperturados(), 'agrupados y ordenados');
          this.loading = false;
        }, error: (error) => {
          this.alertService.showAlert('Ocurrió un error al listar los ciclos...', 'error');
          console.log(error);

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


  listarSeccion = (template: TemplateRef<any>, curso: any) => {
    this.cursoAperturado.set(curso)
    this.modal.openTemplate({
      template,
      titulo: 'Secciones'
    }).afterClosed().subscribe(response => {
      // console.log( response );

      if (response == 'cancelar') {
        console.log(response);
        return
      }
    });
  }

  openOptions = (event: any, curso: ListarCursosAperturados) => {
    console.log(event);
    this.cursoAperturado.set(curso)
  }

  eliminarConfirm = () => {
    console.log(this.cursoAperturado().nSecciones);
    if(this.cursoAperturado().nSecciones > 0) {
      this.alertService.showAlert(`No puede eliminar la seccion, porque cuenta con ${this.cursoAperturado().nSecciones} seccion(es) creadas`,'error')
      return
    }
    
    const cursoMallaEliminar: EliminarCursoAperturado[] = [];
    const curso = {
      idAperturaCurso: this.cursoAperturado().idAperturaCurso,
      idUsuario: parseInt(this.authSignal.currentRol().id),
    };
    cursoMallaEliminar.push(curso);
    this.alertService.sweetAlert('question', 'Confirmar', 'Los cursos que fueron asignados al Plan de Estudios serán ELIMINADOS, ¿Está seguro que desea limpiar la malla curricular?')
      .then(isConfirm => {
        if (!isConfirm) { return }
        this.eliminarCursoApertura(cursoMallaEliminar)
      })
  }
  eliminarCursoApertura = (cursoAperturado: EliminarCursoAperturado[]) => {
    this.aperturaCursoRepository.eliminarCursoAperturado(cursoAperturado).subscribe({
      next: (value) => {
        this.alertService.showAlert('Curso eliminado correctamente', 'success', 5)
        this.obtenerCursosAperturados();
        // this.agruparPorCiclo()
      },
    })
  }
}
