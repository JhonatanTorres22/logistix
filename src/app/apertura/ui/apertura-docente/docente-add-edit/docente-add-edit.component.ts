import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AgregarDocente, EditarDocente } from 'src/app/apertura/domain/models/apertura-docente.model';
import { DocenteRepository } from 'src/app/apertura/domain/repositories/apertura-docente.repository';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { DocenteValidation } from 'src/app/apertura/domain/validations/docente.validation';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuariosRolDomainService } from 'src/app/usuarios/domain/services/usuarios-rol-domain.service';
import { ListDocenteToAddComponent } from '../list-docente-to-add/list-docente-to-add.component';

@Component({
  selector: 'app-docente-add-edit',
  standalone: true,
  imports: [SharedModule, CommonModule, UiInputComponent, UiButtonComponent, UiLoadingProgressBarComponent,ListDocenteToAddComponent],
  templateUrl: './docente-add-edit.component.html',
  styleUrl: './docente-add-edit.component.scss'
})
export class DocenteAddEditComponent implements OnInit{
  seleccionarDocenteNoAsignado = this.docenteSignal.seleccionarDocenteNoAsignado
  loading: boolean = false
  renderizar = this.ambienteSignal.renderizarPor
  formDocente: FormGroup
  docenteEdit = this.docenteSignal.editarDocente;
  seleccionarDocente = this.docenteSignal.seleccionarDocente
  listUsuariosRol= this.usuariosRolDomainService.usuariosRol
  /* VALIDACIONES */
  maxLengthCodigoInterno = this.docenteValidation.maxLengthCodigoInterno;
  minLengthCodigoInterno = this.docenteValidation.minLengthCodigoInterno;

  maxLengthGrados = this.docenteValidation.maxLengthGrados;
  minLengthGrados = this.docenteValidation.minLengthGrados;
  expRegBlockToInputGrados = this.docenteValidation.expRegBlockToInputGrados
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  listaCamposFormulario: string[] = ['codigoInterno', 'discapacidad', 'grado1','grado2']
  
  constructor(
    private usuariosRolDomainService: UsuariosRolDomainService,
    private usuarioRolRepository: UsuarioRolRepository,
    private ambienteSignal: AperturaAmbienteSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private modal: UiModalService,
    private docenteRepository: DocenteRepository,
    private docenteValidation: DocenteValidation,
    private authSignal: AuthSignal,
    private docenteSignal: AperturaDocenteSignal,  
    private alertService: AlertService,
    private deshabilitarInputsFormService: DeshabilitarInputsFormularioService,
  )
    {
      this.formDocente = new FormGroup({
        codigoInterno: new FormControl('', [Validators.required]),
        discapacidad: new FormControl('', [Validators.required]),
        grado1: new FormControl('', [Validators.required]),
        grado2: new FormControl('', [Validators.required]),
      })

    this.deshabilitarInputsFormService.inicializarInputs(this.formDocente, this.listaCamposFormulario, 0);
    this.deshabilitarInputsFormService.controlarInputs(this.formDocente, this.listaCamposFormulario)
    }

    ngOnInit(): void {
      this.patchValue();
    }
    patchValue = () => {
      this.formDocente.patchValue({
        codigoInterno: this.docenteEdit().codigoInterno,
        grado1: this.docenteEdit().primerGrado,
        grado2: this.docenteEdit().segundoGrado == null ? '-' : this.docenteEdit().segundoGrado,
        discapacidad: this.docenteEdit().discapacidad
      })
    }

    onSubmit = () => {
      this.loading = true
      if(this.formDocente.invalid){
        this.alertService.showAlert('Existen errores en validación', 'error')
        this.loading = false
        return;
      }
      const type = this.docenteEdit().idDocente == 0 ? 'Crear' : 'Editar'
      this.alertService.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea guardar los cambios?')
      .then(isConfirm => {
        if(!isConfirm){
          this.loading = false
          return}

        type == 'Crear' ? this.agregarDocente() : this.editarDocente()
      })
    }
    editarDocente = () => {
      const editarDocente: EditarDocente = {
        codigoInterno: this.formDocente.value.codigoInterno,
        discapacidad: this.formDocente.value.discapacidad,
        idDocente: this.docenteEdit().idDocente,
        idUsuario: parseInt(this.authSignal.currentRol().id),
        primerGrado: this.formDocente.value.grado1,
        segundoGrado: this.formDocente.value.grado2
      }
      const renderizarDataDocente = {...this.docenteEdit(),...editarDocente}
      
      this.docenteRepository.editarDocente(editarDocente).subscribe({
        next : () => {
          this.alertService.showAlert('Docente editado correctamente', 'success')
          this.modal.getRefModal().close('Edit');
          this.seleccionarDocente.set(renderizarDataDocente)
          this.docenteEdit.set(renderizarDataDocente)
          this.loading = false
        }, error: (error) => {
          this.alertService.showAlert('Ocurrió un error al editar el docente', 'error');
          this.loading = false
        }
      })
    }

    agregarDocente = () => {
      const agregarDocente : AgregarDocente[] = [{
        codigoInterno: this.formDocente.value.codigoInterno,
        discapacidad: this.formDocente.value.discapacidad,
        idLocal: this.selectSemestreLocal().codigoLocal,
        idSemestre: this.selectSemestreLocal().idSemestre,
        idUsuario: parseInt(this.authSignal.currentRol().id),
        idUsuarioRol: this.seleccionarDocenteNoAsignado().idUsuarioRol,
        primerGrado: this.formDocente.value.grado1,
        segundoGrado: this.formDocente.value.grado2
      }]

      this.docenteRepository.agregarDocente(agregarDocente).subscribe({
        next: (docente)=> {
          this.alertService.showAlert('Docente agregado correctamente', 'success');
          this.modal.getRefModal().close('Add');
          this.seleccionarDocenteNoAsignado.set(this.docenteSignal.seleccionarDocenteNoAsignadoefault)
          this.seleccionarDocente.set(this.docenteSignal.seleccionarDocenteDefault)
          this.renderizar.set('Renderizar');
          this.loading = false
          // this.docenteEdit.set(renderizarDataDocente)
        }, error: (error) => {
          this.alertService.showAlert('Ocurrió un error al agregar el docente', 'error');
          this.loading = false
        }
      })
      
    }
}
