import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { ListaGrupoCursos, ListarCursosAperturados } from 'src/app/apertura/domain/models/apertura-curso.model';
import { EliminarCursoDominioDocente, InsertarCursoDominioDocente, ListarCursosDominioDocente } from 'src/app/apertura/domain/models/apertura-docente.model';
import { AperturaCursoRepository } from 'src/app/apertura/domain/repositories/apertura-curso.repository';
import { DocenteRepository } from 'src/app/apertura/domain/repositories/apertura-docente.repository';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-docente-cursos-dominados',
  standalone: true,
  imports: [SharedModule, CommonModule, UiLoadingProgressBarComponent],
  templateUrl: './docente-cursos-dominados.component.html',
  styleUrl: './docente-cursos-dominados.component.scss'
})
export class DocenteCursosDominadosComponent implements OnInit {
  renderizarAlSeleccionarDocente = this.docenteSignal.renderizarAlSeleccionarDocente
  buscador: string = '';
  idAperturaCursoDominio: number[] = [];
  loading: boolean = false;
  listaCursosAperturados = this.cursoAperturadoSignal.listarCursosAperturados
  selectSemestrelocal = this.cursoAperturadoSignal.selectSemestreLocal
  listarCursoDominioDocente = this.docenteSignal.listarCursosDominioDocente;
  seleccionarDocente = this.docenteSignal.seleccionarDocente;
  constructor(
    private authSignal: AuthSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private aperturaCursoRepository: AperturaCursoRepository,
    private docenteRepository: DocenteRepository,
    private docenteSignal: AperturaDocenteSignal,
    private alertService: AlertService
  )
   { 
    effect(() => {
      if (this.renderizarAlSeleccionarDocente() == 'Renderizar') {
          this.obtenerCursosDominioDocente();
          this.obtenerCursosAperturados()
      }
      this.renderizarAlSeleccionarDocente.set('')
    }, { allowSignalWrites: true })
  }

  
  ngOnInit(): void {
  }

  obtenerCursosDominioDocente = () => {
    this.loading = true
    this.docenteRepository.listarCursoDominioDocente(this.seleccionarDocente().idDocente).subscribe({
      next: (cursosDominio) => {
        this.listarCursoDominioDocente.set(cursosDominio)
        this.alertService.showAlert('Listando cursos que domina el docente', 'success')
        this.idAperturaCursoDominio = cursosDominio.map(curso => curso.idAperturaCurso);
        this.loading = false;
      }, error: (e) => {
        this.alertService.showAlert('Ocurrió un error al listar los cursos que domina el docente', 'error')
        this.loading = false
      }
    })
  }
  obtenerCursosAperturados = () => {
    this.loading = true
    this.aperturaCursoRepository.obtenerCursosAperturados(this.selectSemestrelocal().codigoLocal,
      this.selectSemestrelocal().idProgramaAcademico,
      this.selectSemestrelocal().idSemestre)
      .subscribe({
        next: (cursosAperturados) => {
          setTimeout(() => {
            const cursosFiltrados = cursosAperturados.filter(curso => !this.idAperturaCursoDominio.includes(curso.idAperturaCurso));
            this.listaCursosAperturados.set(cursosFiltrados);
          }, 200);
          setTimeout(() => {
            this.loading = false
          }, 300);
        }, error: (error) => {
          this.alertService.showAlert('Ocurrió un error al listar los ciclos...', 'error');
          this.loading = false

        }
      })
  }

  drop = (event: CdkDragDrop<any[]>, tipo: string) => {
    // Capturamos el curso antes de modificar la lista
    const cursoAEliminar = (event.previousContainer.data[event.previousIndex]);
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
  
      this.loading = true;
  
      switch (tipo) {
        case 'agregar': {
            this.agregarCursoDominioDocente(event.container.data[event.currentIndex]);
          break;
        }
        case 'eliminar': {
          if (!cursoAEliminar || !cursoAEliminar.idCursoDominio) {
            this.loading = false;
            return;
          }
          this.eliminarCursoDominioDocenteConfirm(cursoAEliminar);
          break;
        }
      }
    }
  }
  


  agregarCursoDominioDocente = (curso: ListarCursosAperturados) => {
    const insertarCursoDominio: InsertarCursoDominioDocente[] = [{
      idAperturaCurso: curso.idAperturaCurso,
      idDocente: this.seleccionarDocente().idDocente,
      idUsuario: parseInt(this.authSignal.currentRol().id)
    }]
    this.docenteRepository.insertarCursoDominioDocente(insertarCursoDominio).subscribe({
      next: (data) => {
        this.alertService.showAlert('Se insertó correctamente los cursos', 'success');
          this.obtenerCursosDominioDocente();
          this.obtenerCursosAperturados()
          this.loading = false
      }, error: (e) => {
        this.alertService.showAlert('Ocurrió un error al agregar los cursos', 'error')
        this.loading = false
      }
    })
  }

  eliminarCursoDominioDocenteConfirm = (curso: ListarCursosDominioDocente) => {
    const eliminar: EliminarCursoDominioDocente[] = [{
      idCursoDominio: curso.idCursoDominio,
      idUsuario: parseInt(this.authSignal.currentRol().id)
    }]
      this.eliminarCursoDominioDocente(eliminar)

  }
  eliminarCursoDominioDocente = (eliminar: EliminarCursoDominioDocente[]) => {
    this.docenteRepository.eliminarCursoDominioDocente(eliminar).subscribe({
      next: (data) => {
        this.alertService.showAlert('Curso eliminado correctamente', 'success')
        setTimeout(() => {
          this.obtenerCursosDominioDocente();
          this.obtenerCursosAperturados()
          this.loading = false
        }, 200);
      },
      error: (e) => {
        this.alertService.showAlert('Ocurrió un error al eliminar el curso', 'error')
        this.loading = false
      }
    })

  }
}
