import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ValidarHorario } from 'src/app/horario/domain/models/validar-horario.model';
import { ValidarHorarioRepository } from 'src/app/horario/domain/repositories/validar-horario.repository';
import { ValidarHorarioSignal } from 'src/app/horario/domain/signal/validar-horario.signal';

@Component({
  selector: 'app-list-validar-horario',
  standalone: true,
  imports: [SharedModule, CommonModule, UiLoadingProgressBarComponent],
  templateUrl: './list-validar-horario.component.html',
  styleUrl: './list-validar-horario.component.scss'
})
export class ListValidarHorarioComponent implements OnInit {
  seleccionarSemestreLocal = this.selectSemestreLocal.selectSemestreLocal
  loading: boolean = true
  validarHorario = this.validarHorarioSignal.validarHorario
  listValidarHorario: ValidarHorario[] = []
  displayedColumns: string[] = ['programaAcademico', 'descripcionCurso', 'seccion', 'posibleDocente'];
  dataSource = new MatTableDataSource(this.listValidarHorario)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cantidadNE: number = 0
  renderizarValidarHorario = this.validarHorarioSignal.renderizarHorario
  constructor(
    private selectSemestreLocal : CursoAperturadoSignal,
    private validarHorarioSignal: ValidarHorarioSignal,
    private alertaService: AlertService,
    private repository: ValidarHorarioRepository
  ) {
    effect(() => {
      if (this.renderizarValidarHorario() == 'ValidarHorario') {
        console.log(this.renderizarValidarHorario());
        this.obtenerValidarHorario();
      }
      this.renderizarValidarHorario.set('')
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.obtenerValidarHorario()
  }

  obtenerValidarHorario = () => {
    this.repository.obtenerValidarHorario(this.seleccionarSemestreLocal().idSemestre, this.seleccionarSemestreLocal().codigoLocal).subscribe({
      next: (validarHorario) => {
        this.cantidadNE = validarHorario.filter(item => item.posibleDocente == 'NE').length
        this.dataSource.data = validarHorario.sort((a, b) => {
          if (a.posibleDocente === 'NE' && b.posibleDocente !== 'NE') {
            return -1; // `a` va antes
          } else if (a.posibleDocente !== 'NE' && b.posibleDocente === 'NE') {
            return 1; // `b` va antes
          } else {
            return 0; // Mantener el orden relativo
          }
        });
        this.loading = false
        this.alertaService.showAlert('Listando la validación del horario', 'success')
      },
      error: (e) => {
        this.alertaService.showAlert('Ocurrió un error al mostrar la validación del horario', 'error');
        this.loading = false
      }
    })
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
