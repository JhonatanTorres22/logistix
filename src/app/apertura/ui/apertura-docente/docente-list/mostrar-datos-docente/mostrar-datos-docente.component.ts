import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { DocenteAddEditComponent } from '../../docente-add-edit/docente-add-edit.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { DocenteRepository } from 'src/app/apertura/domain/repositories/apertura-docente.repository';
import { EliminarDocente, ListarDocentes } from 'src/app/apertura/domain/models/apertura-docente.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';

@Component({
  selector: 'app-mostrar-datos-docente',
  standalone: true,
  imports: [SharedModule, UiButtonComponent, UiLoadingProgressBarComponent, CommonModule,DocenteAddEditComponent],
  templateUrl: './mostrar-datos-docente.component.html',
  styleUrl: './mostrar-datos-docente.component.scss'
})
export class MostrarDatosDocenteComponent {
  renderizar = this.ambienteSignal.renderizarPor
  loading= this.docenteSignal.loadingDocente
  seleccionarDocente = this.docenteSignal.seleccionarDocente
  editarDocente = this.docenteSignal.editarDocente

  constructor(
    private ambienteSignal: AperturaAmbienteSignal,
    private modal: UiModalService,
    private authSignal: AuthSignal,
    private alertaService: AlertService,
    private docenteRepository: DocenteRepository,
    private docenteSignal: AperturaDocenteSignal
  ){}

  modalEditDocente = (template: TemplateRef<any>, docente:ListarDocentes) => {
    this.editarDocente.set(docente)

    this.modal.openTemplate({
      template,
      titulo: 'Editar Docente',
    }).afterClosed().subscribe(data => {
      console.log(data);
      if (data === 'cancelar') {
        return
      }
    })
  }

  eliminarDocenteConfirm = (docente: ListarDocentes) => {
    this.loading.set(true)
    const deleteDocente : EliminarDocente = {
      idDocente: docente.idDocente,
      idUsuario: parseInt(this.authSignal.currentRol().id)
    }    
    this.alertaService.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar el docnete?')
    .then(isConfirm => {
      if(!isConfirm){
        this.loading.set(false)
        return}
      this.loading.set(false)
      this.eliminarDocente(deleteDocente)

    })
  }

  eliminarDocente = (eliminarDocente: EliminarDocente) => {
    this.docenteRepository.eliminarDocente(eliminarDocente).subscribe({
      next: () => {
        this.alertaService.showAlert('Docente eliminado correctamente', 'success');
        this.renderizar.set('Renderizar');
        this.seleccionarDocente.set(this.docenteSignal.seleccionarDocenteDefault)
        this.loading.set(false)
      }, error: (error) => {
        this.alertaService.showAlert('Ocurrió un error al eliminar los ambientes...', 'error');
        this.loading.set(false)
      }
    }) 
  }
}
