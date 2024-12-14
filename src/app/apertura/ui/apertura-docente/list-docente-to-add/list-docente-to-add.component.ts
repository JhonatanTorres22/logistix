import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListarDocenteNoAsignado } from 'src/app/apertura/domain/models/apertura-docente.model';
import { DocenteRepository } from 'src/app/apertura/domain/repositories/apertura-docente.repository';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-list-docente-to-add',
  standalone: true,
  imports: [CommonModule, SharedModule, UiLoadingProgressBarComponent],
  templateUrl: './list-docente-to-add.component.html',
  styleUrl: './list-docente-to-add.component.scss'
})
export class ListDocenteToAddComponent implements OnInit {
  loading : boolean = false
  seleccionarDocenteNoAsignado = this.docenteSignal.seleccionarDocenteNoAsignado
  displayedColumns: string[] = ['nombreAp', 'numeroDocumento', 'action']
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  docenteNoAsignado: ListarDocenteNoAsignado[] = []
  dataSource = new MatTableDataSource(this.docenteNoAsignado)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private docenteSignal: AperturaDocenteSignal,
    private alertService:AlertService,
    private docenteRepository: DocenteRepository
  ){}
  ngOnInit(): void {
    this.obtenerDocenteNoAsignado()
  }
  obtenerDocenteNoAsignado = () => {
    this.loading = true
    this.docenteRepository.obtenerDocenteNoAsignado(17,this.selectSemestreLocal().idSemestre).subscribe({
      next: (data) => {
        this.dataSource.data = data
        this.alertService.showAlert('Listando docentes que no han sido asignados', 'success')
        console.log(data,'listando...');
        this.loading = false
      }, error : (error) => {
        this.alertService.showAlert('Ocurrió un error al listar los docentes', 'error')
        this.loading = false
      }
    })
  }
  
  addDocente =(docente: ListarDocenteNoAsignado) => {
    this.seleccionarDocenteNoAsignado.set(docente)
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }
}
