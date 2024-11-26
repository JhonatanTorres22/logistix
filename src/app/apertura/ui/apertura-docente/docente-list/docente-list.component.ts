import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AperturaDocenteRepositoryImpl } from 'src/app/apertura/infraestructure/repositories/docente.repository.impl';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { DocenteImportTemplateComponent } from './docente-import-template/docente-import-template.component';
import { DocenteAddComponent } from '../docente-add/docente-add.component';
import Swal from 'sweetalert2';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { UsuarioCrear } from 'src/app/usuarios/domain/models/usuario.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { MatSelectChange } from '@angular/material/select';
import { UsuarioRolSignal } from 'src/app/usuarios/domain/signals/usuario-rol.signal';
import { RolRepository } from 'src/app/roles/domain/repositories/rol.repository';
import { Rol } from 'src/app/roles/domain/models/rol.model';
import { MostrarDatosDocenteComponent } from './mostrar-datos-docente/mostrar-datos-docente.component';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent, MostrarDatosDocenteComponent,
    DocenteImportTemplateComponent,
    DocenteAddComponent,
    UiLoadingProgressBarComponent],
  templateUrl: './docente-list.component.html',
  styleUrl: './docente-list.component.scss'
})
export class DocenteListComponent implements OnInit {
  seleccionarDocente = this.docenteSignal.seleccionarDocente
  loading : boolean = true
  listarDocente = this.docenteSignal.listarDocente;
  selectSemestreLocal = this.cursoAperturadoSignal.listaSemestreLocal
  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private docenteSignal: AperturaDocenteSignal,
    private docenteRepository: AperturaDocenteRepositoryImpl,
    private alertaService: AlertService,
    private modal: UiModalService,
  ){}

  ngOnInit(): void {


    this.obtenerDocente()
    
  }



  obtenerDocente = () => {
    this.docenteRepository.obtenerDocentes(this.selectSemestreLocal().idSemestre,
  this.selectSemestreLocal().codigoLocal).subscribe({
    next:(docentes) => {
      this.alertaService.showAlert('Listando los docentes correctamente', 'success');
      this.listarDocente.set(docentes);
      this.loading = false
    }, error: (error) => {
      this.alertaService.showAlert('Ocurrió un error al listar los docentes', 'error');
      console.log(error);
      this.loading = false

    }
  })
  }

  modalImportarDocente = (template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Importar Docentes'
    }).afterClosed().subscribe(response => {
      if (response == 'cancelar') {
        console.log(response);
        return
      }
    });
  }

  modalAddDocente = (template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Agregar Docente'
    }).afterClosed().subscribe(response => {
      if (response == 'cancelar') {
        console.log(response);
        return
      }
    });
  }

  onDocenteSelected(idDocente: number): void {
// Asume que listarDocente devuelve un array con todos los docentes
    const selectedDocente = this.listarDocente().find(docente => docente.idDocente === idDocente) || this.docenteSignal.seleccionarDocenteDefault;
    this.seleccionarDocente.set(selectedDocente)    
  }
}

