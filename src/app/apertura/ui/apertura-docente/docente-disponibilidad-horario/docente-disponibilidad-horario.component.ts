import { Component, effect, Input, OnInit } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/demo/services/alert.service';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { DocenteRepository } from 'src/app/apertura/domain/repositories/apertura-docente.repository';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgregarDisponibilidadDocente, CeldaSeleccionada, EliminarDisponibilidadDocente, ListarDisponibilidadDocente, ListarLocalFiltrado } from 'src/app/apertura/domain/models/apertura-docente.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';

@Component({
  selector: 'app-docente-disponibilidad-horario',
  standalone: true,
  imports: [SharedModule, CommonModule,  UiLoadingProgressBarComponent, MatGridListModule, FullCalendarModule],
  templateUrl: './docente-disponibilidad-horario.component.html',
  styleUrl: './docente-disponibilidad-horario.component.scss'
})
export class DocenteDisponibilidadHorarioComponent implements OnInit {
  @Input() localesFiltrados : ListarLocalFiltrado[]
  loading : boolean = true
  listarDisponibilidadDocente = this.docenteSignal.listarDisponibilidadDocente
  renderizarAlSeleccionarDocente = this.docenteSignal.renderizarAlSeleccionarDocente
  seleccionarDocente = this.docenteSignal.seleccionarDocente;
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal

  renderizarDisponibilidad = this.docenteSignal.renderizarDisponibilidad
  // Variables de arrastre
  celdasSeleccionadas: CeldaSeleccionada[] = [];
  dragging = false;
  startDiaId: number | null = null;
  startHoraId: number | null = null;


  dias = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
  horasAcademicas = [
    '07:40 - 08:30', '08:30 - 09:20', '09:20 - 10:10', '10:10 - 11:00', '11:00 - 11:50', 
    '11:50 - 12:40', '12:40 - 13:30', '13:30 - 14:20', '14:20 - 15:10', '15:10 - 16:00', 
    '16:00 - 16:50', '16:50 - 17:40', '17:40 - 18:30', '18:30 - 19:20', '19:20 - 20:10', 
    '20:10 - 21:00', '21:00 - 21:50', '21:50 - 22:40', '22:40 - 23:30'
  ]

  displayedColumns: string[] = ['hora', ...this.dias];
  localColors: string[] = [
   '#C2F0C2','#BAE1FF','#FFBAE1','#F8D8B4','#F3C7E0','#FFFFBA', '#FFB3BA','#FFDFBA', '#D1BAFF','#BAFFB3',
  ];

  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private authSignal: AuthSignal,
    private docenteSignal: AperturaDocenteSignal,
    private alertServcie: AlertService,
    private docenteRepository: DocenteRepository
  ) {
    effect(() => {
      if (this.renderizarDisponibilidad() == 'RenderizarDisponibilidad') {
        console.log(this.renderizarDisponibilidad(), 'renderizando la disponibilidad');
        
          this.obtenerDisponibilidad()
      }
      this.renderizarDisponibilidad.set('')
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
  }

  obtenerDisponibilidad = () => {
    this.loading = true
    this.docenteRepository.obtenerDisponibilidadDocente(this.seleccionarDocente().idDocente).subscribe({
      next: (disponibilidad) => {
        this.listarDisponibilidadDocente.set(disponibilidad)
        this.alertServcie.showAlert('Listando disponibilidad docente', 'success');
        this.loading = false
      },
      error: (e) => {
        this.alertServcie.showAlert('Ocurrió un error al listar la disponibilidad del docente', 'error');
        this.loading = false
      }
    });
  };

  esCeldaPintada = (diaId: number, horaId: number): boolean => {
    return !!this.listarDisponibilidadDocente().find(
      c => c.idDia === diaId && c.idHora === horaId
    );
  };

  esCeldaBloqueada = (diaId: number, horaId: number): boolean => {
    const celda = this.listarDisponibilidadDocente().find(
      c => c.idDia === diaId && c.idHora === horaId
    );
    return celda ? celda.idProgramaAcademico !== this.selectSemestreLocal().idProgramaAcademico : false;
  };

  esLocalCoincidente = (diaId: number, horaId: number): boolean => {
    const celda = this.listarDisponibilidadDocente().find(
      c => c.idDia === diaId && c.idHora === horaId
    );
    return celda ? celda.idLocal === this.selectSemestreLocal().codigoLocal : true;
  };

  // Función para empezar la selección (cuando se hace clic en una celda)
  startSelection = (diaId: number, horaId: number) => {
    if (this.esCeldaBloqueada(diaId, horaId)) {
      this.alertServcie.showAlert('Esta celda no pertenece a tu programa académico', 'warning');
      this.loading = false
      return;
    }
    this.dragging = true;
    this.startDiaId = diaId;
    this.startHoraId = horaId;
    this.addSelection(diaId, horaId);
  };

  getLocalColor = (diaId: number, horaId: number): string => {
    const celda = this.listarDisponibilidadDocente().find(
      c => c.idDia === diaId && c.idHora === horaId
    );
  
    if (!celda) {
      return ''; // Sin color si no hay disponibilidad
    }
  
    if (this.esCeldaBloqueada(diaId, horaId)) {
      return 'rgb(200, 200, 200)'; // Gris para celdas bloqueadas
    }
    // Buscar el local con el id del celda
    const local = this.localesFiltrados.find((l: { id: number; }) => l.id === celda.idLocal);
  
    if (!local) {
      return ''; // Si el local no se encuentra, no se asigna color
    }
  
    // Asignar color según la posición en el array localColors
    const localIndex = this.localesFiltrados.indexOf(local);
    return this.localColors[localIndex] || ''; // Usar el color correspondiente al índice del local
  };
  

  // Función para arrastrar y seleccionar celdas
  draggingSelection = (diaId: number, horaId: number) => {
    if (this.dragging && !this.esCeldaBloqueada(diaId, horaId)) {
      this.addSelection(diaId, horaId);
    }
  };

  isAdding = (diaId: number, horaId: number): boolean => {
    return this.celdasSeleccionadas.some(cell =>
      !this.listarDisponibilidadDocente().some(
        disponibilidad => disponibilidad.idDia === cell.diaId && disponibilidad.idHora === cell.horaId
      ) && cell.diaId === diaId && cell.horaId === horaId
    );
  };

  // Verificar si la celda está seleccionada para eliminar
  isRemoving = (diaId: number, horaId: number): boolean => {
    return this.celdasSeleccionadas.some(cell =>
      this.listarDisponibilidadDocente().some(
        disponibilidad => disponibilidad.idDia === cell.diaId && disponibilidad.idHora === cell.horaId
      ) && cell.diaId === diaId && cell.horaId === horaId
    );
  };

  // Función para añadir la celda seleccionada
  addSelection = (diaId: number, horaId: number): void => {
    const esExistente = this.listarDisponibilidadDocente().some(
      disponibilidad => disponibilidad.idDia === diaId && disponibilidad.idHora === horaId
    );

    // Determinar el tipo de selección actual (agregar o eliminar)
    const seleccionParaAgregar = this.celdasSeleccionadas.some(
      cell => !this.listarDisponibilidadDocente().some(
        disponibilidad => disponibilidad.idDia === cell.diaId && disponibilidad.idHora === cell.horaId
      )
    );

    const seleccionParaEliminar = this.celdasSeleccionadas.some(
      cell => this.listarDisponibilidadDocente().some(
        disponibilidad => disponibilidad.idDia === cell.diaId && disponibilidad.idHora === cell.horaId
      )
    );

    // Validar exclusión mutua
    if ((seleccionParaAgregar && esExistente) || (seleccionParaEliminar && !esExistente)) {
      const accion = seleccionParaAgregar ? 'eliminar' : 'agregar';
      this.alertServcie.showAlert(`No puedes seleccionar celdas para ${accion} mientras seleccionas celdas de otro tipo`, 'warning');
      return;
    }

    // Agregar celda si no está seleccionada
    if (!this.celdasSeleccionadas.some(c => c.diaId === diaId && c.horaId === horaId)) {
      this.celdasSeleccionadas.push({ diaId, horaId });
    }
  };

  endSelection = () => {
    this.dragging = false;
    const celdasExistentes = this.celdasSeleccionadas.filter(cell =>
      this.listarDisponibilidadDocente().some(
        disponibilidad => disponibilidad.idDia === cell.diaId && disponibilidad.idHora === cell.horaId
      )
    );
  
    const celdasNuevas = this.celdasSeleccionadas.filter(cell =>
      !this.listarDisponibilidadDocente().some(
        disponibilidad => disponibilidad.idDia === cell.diaId && disponibilidad.idHora === cell.horaId
      )
    );
  
    // Validar que todas las celdas a eliminar pertenezcan al mismo programa académico y local
    const programaAcademico = this.selectSemestreLocal().idProgramaAcademico;
    const local = this.selectSemestreLocal().codigoLocal;
  
    const celdasInvalidas = celdasExistentes.filter(cell => {
      const celda = this.listarDisponibilidadDocente().find(
        c => c.idDia === cell.diaId && c.idHora === cell.horaId
      );
      return celda && (celda.idProgramaAcademico !== programaAcademico || celda.idLocal !== local);
    });
  
    if (celdasInvalidas.length > 0) {
      this.alertServcie.showAlert('No puedes eliminar celdas de otro programa académico o local', 'warning');
      this.celdasSeleccionadas = [];
      this.loading = false;

      return;
    }
  
    if (celdasExistentes.length > 0) {
      this.loading = true;
      this.eliminarDisponibilidadConfirm(celdasExistentes);
    }
  
    if (celdasNuevas.length > 0) {
      this.loading = true;
      this.agregarDisponibilidad();
    }
  };
  

  agregarDisponibilidad = () => {

    if (this.celdasSeleccionadas.length === 0) {
      this.alertServcie.showAlert('No has seleccionado ninguna celda para agregar disponibilidad', 'warning');
      return;
    }

    this.alertServcie.sweetAlert('question', 'Confirmar', '¿Está seguro que desea agregar la disponibilidad del docente?')
      .then(isConfirm => {
        if (!isConfirm) {
          this.celdasSeleccionadas = [];
          this.loading = false
          return
        }

        const agregarDisponibilidad: AgregarDisponibilidadDocente[] = this.celdasSeleccionadas.map(cell => ({
          idDia: cell.diaId,
          idHora: cell.horaId,
          idDocente: this.seleccionarDocente().idDocente,
          idUsuario: parseInt(this.authSignal.currentRol().id),
          idProgramaAcademico: this.selectSemestreLocal().idProgramaAcademico,
          idLocal: this.selectSemestreLocal().codigoLocal
        }));

        console.log(agregarDisponibilidad,'agregando disponibilidad del docente');
        

        this.docenteRepository.agregarDisponibilidadDocente(agregarDisponibilidad).subscribe({
          next: () => {
            this.alertServcie.showAlert('Disponibilidad agregada exitosamente', 'success');
            this.obtenerDisponibilidad()
            this.celdasSeleccionadas = [];
            this.loading = false
          },
          error: (e) => {
            this.alertServcie.showAlert('Ocurrió un error al agregar la disponibilidad', 'error');
            this.loading = false
          }
        });
      })
  }

  eliminarDisponibilidadConfirm = (disponibilidad: CeldaSeleccionada[]) => {
    const eliminarDisponibilidad: EliminarDisponibilidadDocente[] = disponibilidad.map(celda => ({
      idDia: celda.diaId,
      idDocente: this.seleccionarDocente().idDocente,
      idHora: celda.horaId,
      idUsuario: parseInt(this.authSignal.currentRol().id)
    }));

    this.alertServcie.sweetAlert('question', '¿Confirmar?', 'Está seguro que desea eliminar la disponibilidad del docente')
      .then(isConfirm => {
        if (!isConfirm) {
          this.celdasSeleccionadas = []
          this.loading = false
          return
        }
        this.eliminarDocente(eliminarDisponibilidad)
      })
  }

  eliminarDocente = (eliminar: EliminarDisponibilidadDocente[]) => {
    this.docenteRepository.eliminarDisponibilidadDocente(eliminar).subscribe({
      next: () => {
        this.alertServcie.showAlert('Disponibilidad eliminada exitosamente', 'success');
        this.obtenerDisponibilidad(); // Refrescar datos
        this.celdasSeleccionadas = [];
        this.loading = false
      },
      error: (e) => {
        this.alertServcie.showAlert('Ocurrió un error al eliminar la disponibilidad', 'error');
        this.loading = false
      }
    });
  }
}
