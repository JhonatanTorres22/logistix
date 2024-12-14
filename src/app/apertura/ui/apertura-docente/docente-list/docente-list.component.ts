import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, TemplateRef } from '@angular/core';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AperturaDocenteRepositoryImpl } from 'src/app/apertura/infraestructure/repositories/docente.repository.impl';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { DocenteImportTemplateComponent } from './docente-import-template/docente-import-template.component';
import { MostrarDatosDocenteComponent } from './mostrar-datos-docente/mostrar-datos-docente.component';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';
import { DocenteAddEditComponent } from '../docente-add-edit/docente-add-edit.component';
import { DocenteCursosDominadosComponent } from '../docente-cursos-dominados/docente-cursos-dominados.component';
import { DocenteDisponibilidadHorarioComponent } from '../docente-disponibilidad-horario/docente-disponibilidad-horario.component';
import { ListDocenteToAddComponent } from '../list-docente-to-add/list-docente-to-add.component';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent, MostrarDatosDocenteComponent,
    DocenteAddEditComponent, DocenteCursosDominadosComponent,
    ListDocenteToAddComponent,
    UiLoadingProgressBarComponent],
  templateUrl: './docente-list.component.html',
  styleUrl: './docente-list.component.scss'
})
export class DocenteListComponent implements OnInit {
  idLocalSelected= this.docenteSignal.idLocalSelect
  seleccionarDocenteNoAsignado = this.docenteSignal.seleccionarDocenteNoAsignado
  renderizarAlSeleccionarDocente = this.docenteSignal.renderizarAlSeleccionarDocente
  renderizar = this.ambienteSignal.renderizarPor
  seleccionarDocente = this.docenteSignal.seleccionarDocente;
  editarDocente = this.docenteSignal.editarDocente
  loading= this.docenteSignal.loadingDocente
  listarDocente = this.docenteSignal.listarDocente;
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  constructor(
    private ambienteSignal: AperturaAmbienteSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private docenteSignal: AperturaDocenteSignal,
    private docenteRepository: AperturaDocenteRepositoryImpl,
    private alertaService: AlertService,
    private modal: UiModalService,
  ){
    effect(() => {
      if (this.renderizar() == 'Renderizar') {
        console.log(this.renderizar(), 'renderizando desde docentes');
        
        this.obtenerDocente()
      }
      this.renderizar.set('')
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    // this.obtenerDocente()
  }



  obtenerDocente = () => {
    this.loading.set(true)
    this.docenteRepository.obtenerDocentes(this.selectSemestreLocal().idSemestre).subscribe({
    next:(docentes) => {
      this.alertaService.showAlert('Listando los docentes correctamente', 'success');
      this.listarDocente.set(docentes);
      this.loading.set(false)
      console.log(docentes);
      
    }, error: (error) => {
      this.alertaService.showAlert('Ocurrió un error al listar los docentes', 'error');
      this.loading.set(false)

    }
  })
  }

  modalImportarDocente = (template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Importar Docentes'
    }).afterClosed().subscribe(response => {
      if (response == 'cancelar') {
        return
      }
    });
  }

  modalAddDocente = (template: TemplateRef<any>) => {
    this.editarDocente.set(this.docenteSignal.seleccionarDocenteDefault)
    this.modal.openTemplate({
      template,
      titulo: 'Agregar Docente'
    }).afterClosed().subscribe(response => {
      if (response == 'cancelar') {
        this.seleccionarDocenteNoAsignado.set(this.docenteSignal.seleccionarDocenteNoAsignadoefault)
        return
      }
    });
  }

  onDocenteSelected = (idDocente: number) => {
// Asume que listarDocente devuelve un array con todos los docentes
    const selectedDocente = this.listarDocente().find(docente => docente.idDocente === idDocente) || this.docenteSignal.seleccionarDocenteDefault;
    this.seleccionarDocente.set(selectedDocente)
    this.editarDocente.set(selectedDocente)
    this.renderizarAlSeleccionarDocente.set('Renderizar')
    this.idLocalSelected.set(0)
  }
}