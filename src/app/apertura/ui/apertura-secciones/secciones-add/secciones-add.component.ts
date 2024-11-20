import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiSelectComponent } from "../../../../core/components/ui-select/ui-select.component";
import { UiSelect } from 'src/app/core/components/ui-select/ui-select.interface';
import { UiTextAreaComponent } from 'src/app/core/components/ui-text-area/ui-text-area.component';
import { AgregarSeccion, AgregarTipoAmbienteASeccion, EditarSeccion, EliminarTipoAmbiente,  ListarSecciones, ListarTipoAmbiente } from 'src/app/apertura/domain/models/apertura-seccion.model';
import { AperturaSeccionRepository } from 'src/app/apertura/domain/repositories/apertura-secciones.repository';
import { AperturaSeccionesSignal } from 'src/app/apertura/domain/signal/apertura-secciones.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SeccionValidation } from 'src/app/apertura/domain/validations/secciones.validation';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
@Component({
  selector: 'app-secciones-add',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonComponent,
    UiInputComponent,
    UiLoadingProgressBarComponent],
  templateUrl: './secciones-add.component.html',
  styleUrl: './secciones-add.component.scss'
})
export class SeccionesAddComponent implements OnInit {

  renderizarPor = this.cursoAperturadoSignal.renderizarPor;
  loading: boolean = true
  mostrarCantidadGrupos: boolean = false;
  mostrarSelectTipoAmbiente: boolean = false;
  listaSecciones = this.seccionSignal.listaSecciones
  listaCursosAperturados = this.cursoAperturadoSignal.listaCursosAperturados
  listaFormato = this.seccionSignal.listaFormato;
  listarTipoAmbiente = this.seccionSignal.listaTipoAmbiente;
  formSelectedTipo = new FormControl<any[]>([]);
  selectedChips: any[] = [];

  @Input() seccionEdit: ListarSecciones;
  @Output() cerrarFormulario: EventEmitter<string> = new EventEmitter();
  formSeccion: FormGroup;
  infoDirector = this.authSignal.currentInfoDirector()
  cursoAperturado = this.cursoAperturadoSignal.cursoAperturado;

  /* OBSERVACIÓN */
  maxLengthObservacion: number = this.validation.maxLengthObservacion;
  minLenghtObservación: number = this.validation.minLenghtObservación;

  /* VACANTES */
  minLengthVacantes: number = this.validation.minLengthVacantes;
  maxLengthVacantes: number = this.validation.maxLengthVacantes;
  minVacantes: number = this.validation.minVacantes;
  maxVacantes: number = this.validation.maxVacantes;
  expRegVacantesBlockToInput: RegExp = this.validation.expRegVacantesBlockToInput

  listaCamposFormulario: string[] = ['vacantes', 'formato']

  checkboxChecked = false;
  constructor(
    private deshabilitarInputsFormService: DeshabilitarInputsFormularioService,
    private validation: SeccionValidation,
    private seccionSignal: AperturaSeccionesSignal,
    private repository: AperturaSeccionRepository,
    private authSignal: AuthSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private alertaService: AlertService
  ) {
      this.formSeccion = new FormGroup({
      observacion: new FormControl('-', [Validators.required, Validators.maxLength(this.maxLengthObservacion), Validators.minLength(this.minLenghtObservación)]),
      discapacidad: new FormControl(false),
      vacantes: new FormControl('', [Validators.required, Validators.min(this.minVacantes), Validators.max(this.maxVacantes),
      Validators.maxLength(this.maxLengthVacantes), Validators.minLength(this.minLengthVacantes)]),
      formato: new FormControl(''),
      nGrupos: new FormControl('',[  Validators.required ])
    })

    this.deshabilitarInputsFormService.inicializarInputs(this.formSeccion, this.listaCamposFormulario, 0);
    this.deshabilitarInputsFormService.controlarInputs(this.formSeccion, this.listaCamposFormulario)

    this.updateSelectedAmbiente()
  }

  pathValueForm() {
    this.formSeccion.patchValue({
      observacion: this.seccionEdit.detalleObservacion.trim(),
      discapacidad: this.seccionEdit.discapacidad,
      vacantes: this.seccionEdit.nVacantes,
    });

    const selectedAmbientes = this.seccionEdit.ambiente.map((ambiente) => ({
      idTipoAmbiente: ambiente.idTipoAmbiente,
      nombreTipoAmbiente: ambiente.nombreTipoAmbiente,
    }));
    this.formSelectedTipo.patchValue(selectedAmbientes);
  }

  ngOnInit(): void {
    
    this.obtenerFormato();
    this.seccionEdit ? this.pathValueForm() : '';
    if (!this.checkboxChecked) {
      this.formSeccion?.get('observacion')?.setValue('-');
    }
  }

  
  checkGrupoTrue() {
    this.mostrarCantidadGrupos = this.formSelectedTipo.value?.some((tipo) => tipo.grupo === true) ?? false;
  }

  isTipoAmbienteDisabled(option: ListarTipoAmbiente): boolean {
    const selectedTipos = this.formSelectedTipo.value || [];
    // Si ya hay 2 elementos seleccionados, deshabilitar todas las opciones no seleccionadas
    if (selectedTipos.length >= 2 && !selectedTipos.includes(option)) {
      return true; // Deshabilitar si ya hay 2 seleccionados y la opción no está seleccionada
    }
    // Contamos cuántos tipos con grupo false están seleccionados
    const grupoFalseSelected = selectedTipos.filter((tipo: any) => !tipo.grupo).length;
    // Si ya se seleccionaron 2 tipos con grupo false, deshabilitar otros tipos con grupo false
    if (grupoFalseSelected >= 2 && !option.grupo && !selectedTipos.includes(option)) {
      return true; // Deshabilitar si ya se seleccionaron 2 tipos con grupo false y la opción no está seleccionada
    }
    // Verificar si ya se seleccionó un tipo con grupo true
    const grupoTrueSelected = selectedTipos.some((tipo: any) => tipo.grupo);
    // Si ya se seleccionó un tipo con grupo true, deshabilitar otros tipos con grupo true
    if (grupoTrueSelected && option.grupo && !selectedTipos.includes(option)) {
      return true; // Deshabilitar si ya se seleccionó un grupo true y la opción no está seleccionada
    }  
    return false; // Si no se cumplen las condiciones, no deshabilitar
  }  

  obtenerFormato = () => {
    this.repository.obtenerFormato().subscribe({
      next: (formato) => {
        this.listaFormato.set(formato);
        this.loading = false
      },
      error: () => {
        this.alertaService.sweetAlert('error')
      }
    })
  }

  seleccionarFormato = (event: any): void => {
    const idFormato = event.value; // Objeto JSON completo
    this.obtenerTipoAmbiente(idFormato);
  }

  obtenerTipoAmbiente = (idFormato: number) => {
    this.loading = true
    this.repository.obtenerTipoAmbiente(idFormato).subscribe(({
      next: (tipoAmbiente) => {
        this.listarTipoAmbiente.set(tipoAmbiente);
        this.loading = false
      },
      error: () => {
        this.alertaService.sweetAlert('error')
      }
    }))
  }

  updateSelectedAmbiente = () => {
    this.selectedChips = this.formSelectedTipo.value || [];
    this.checkGrupoTrue()
    const nGruposControl = this.formSeccion.get('nGrupos');
    if (!nGruposControl) return;
  
    if (this.mostrarCantidadGrupos) {
      this.formSeccion?.get('nGrupos')?.setValue('');
      nGruposControl.setValidators([Validators.required, Validators.min(1)]);
    } else {
      nGruposControl.clearValidators();
    }
    nGruposControl.updateValueAndValidity({ emitEvent: false });
    this.formSeccion.updateValueAndValidity();
  }

  removerTipoAmbienteSeleccionado = (ambienteSeleccionado: ListarTipoAmbiente): void => {
    const selected = this.formSelectedTipo.value as ListarTipoAmbiente[];
    const index = selected.findIndex(option => option.idTipoAmbiente == ambienteSeleccionado.idTipoAmbiente);

    if (index >= 0) {
      selected.splice(index, 1);
      this.formSelectedTipo.setValue(selected); // Actualizar el control de formulario
    }
    this.updateSelectedAmbiente(); // Actualizar la lista de chips
  }


  // Función que calcula la siguiente sección en base a la cantidad actual
  obtenerSiguienteSeccion = (): string => {
    const cantidad = parseInt(String(this.listaSecciones().length), 10);
    const siguienteSeccion = String.fromCharCode(65 + cantidad); // 65 es el código ASCII de 'A'
    return siguienteSeccion;
  }

  toggleObservacion = () => {
    this.checkboxChecked = !this.checkboxChecked; // Cambia el estado
    if (!this.checkboxChecked) {
      this.formSeccion?.get('observacion')?.setValue('-');
    }
  }

  eliminarTipoEstudioConfirm = (seccion: ListarSecciones, idTipoAmbienteEliminar: number) => {
    this.alertaService.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar el Tipo Ambiente?')
      .then(isConfirm => {
        if (!isConfirm) return
        this.loading = true
        let ambienteEliminar = seccion.ambiente.find(ambiente => ambiente.idTipoAmbiente === idTipoAmbienteEliminar);
        if (ambienteEliminar) {
          let eliminarTipoAmbiente: EliminarTipoAmbiente = {
            idAperturaSeccion: seccion.idAperturaSeccion,
            idTipoAmbiente: ambienteEliminar.idTipoAmbiente
          }
          this.eliminarTipoAmbiente(eliminarTipoAmbiente)
        }
      })
  }

  eliminarTipoAmbiente = (eliminarTipoAmbiente: EliminarTipoAmbiente) => {
    this.repository.eliminarTipoAmbiente(eliminarTipoAmbiente).subscribe({
      next: () => {
        this.alertaService.sweetAlert('success', '¡Correcto!', 'El tipo de ambiente fue eliminado exitosamente')
        this.cerrarFormulario.emit('DeleteTipoAmbiente')
          this.seccionEdit.ambiente = this.seccionEdit.ambiente.filter(ambiente => ambiente.idTipoAmbiente !== eliminarTipoAmbiente.idTipoAmbiente);
          if (this.formSelectedTipo?.value) {
            const newValue = this.formSelectedTipo.value.filter(
              tipo => tipo.idTipoAmbiente !== eliminarTipoAmbiente.idTipoAmbiente
            );
            this.formSelectedTipo.setValue(newValue);
          }
          this.loading = false
      }, error: (error) => {
        this.alertaService.sweetAlert('error', 'Error', 'Ocurrió un error al eliminar:' + error)
      }
    })
  }

  onSubmit = () => {
    if (this.formSeccion.invalid && this.formSelectedTipo.value?.length == 0) {
      this.alertaService.showAlert('El formulario está incompleto o no cumple con los valores esperados');
      return;
    }
    const tipoAccionForm = this.seccionEdit.idAperturaSeccion !== 0 ? 'Editar' : 'Crear';
    this.alertaService.sweetAlert('question', 'Confirmación', `¿Está seguro que desea ${tipoAccionForm} la sección?`)
      .then(isConfirm => {
        if (!isConfirm) return;
  
        this.loading = true
        // Comparación de ambientes
        const ambientesSeccion = this.seccionEdit.ambiente.map(item => item.idTipoAmbiente);
        const ambientesForm = this.formSelectedTipo.value?.map(item => item.idTipoAmbiente) || [];
  
        if (tipoAccionForm === 'Crear') {
          this.guardarSeccion();
        } else {
          // Si está editando, comparamos los ambientes y si hay nuevos, los agregamos
          const ambientesNuevos = ambientesForm.filter(id => !ambientesSeccion.includes(id));
          if (ambientesNuevos.length > 0) {
            this.editarSeccion()
            this.agregarTipoAmbiente()
          } else {
            this.editarSeccion();
          }
        }
      });
  }

  agregarTipoAmbiente = () => {
    const tiposAmbienteSeleccionados = this.formSelectedTipo.value || [];
    if (tiposAmbienteSeleccionados.length === 0) {
      return;
    }
    const agregarTipoAmbiente: AgregarTipoAmbienteASeccion[] = tiposAmbienteSeleccionados.map((tipoAmbiente: ListarTipoAmbiente) => ({
      idAperturaSeccion: this.seccionEdit.idAperturaSeccion,
      idTipoAmbiente: tipoAmbiente.idTipoAmbiente, // ID del tipo de ambiente
      cantidadGrupos: tipoAmbiente.grupo ? this.formSeccion.value.nGrupos : 0 // Si grupo es true, asigna ngrupo; si no, asigna 0
  }));

    this.repository.agregarTipoAmbienteASeccion(agregarTipoAmbiente).subscribe({
      next: ( agregarTipo ) => {
        this.alertaService.showAlert('Se creó correctamente los tipos de ambientes', 'success')
      },error: () => {
        this.alertaService.showAlert('Ocurrió un error al guardar los tipos de ambientes', 'error')
      }
    })
  }

  guardarSeccion = () => {
    const tiposAmbienteSeleccionados = this.formSelectedTipo.value || [];
    if (tiposAmbienteSeleccionados.length === 0) {
      return;
    }
    const agregarSeccion: AgregarSeccion[] = tiposAmbienteSeleccionados.map((tipoAmbiente: ListarTipoAmbiente) => ({
      detalleObservacion: this.formSeccion.value.observacion,
      discapacidad: this.formSeccion.value.discapacidad,
      idAperturaCurso: this.cursoAperturado().idAperturaCurso,
      idTipoAmbiente: tipoAmbiente.idTipoAmbiente, // ID del tipo de ambiente
      nombreSeccion: this.obtenerSiguienteSeccion(),
      nVacantes: this.formSeccion.value.vacantes,
      nGrupos: tipoAmbiente.grupo ? this.formSeccion.value.nGrupos : 0
    }));

    console.log(agregarSeccion,'agregando seccion');
    

    this.repository.insertarSecciones(agregarSeccion).subscribe({
      next: (agregaSeccion) => {
        console.log(agregarSeccion,'***');
        
        this.alertaService.sweetAlert('success', '¡Correcto!', 'La sección fue creada exitosamente')
        this.cerrarFormulario.emit('Add');
        this.renderizarPor.set('RenderizarCurso')
        this.loading = false
      },
      error: () => {
        this.alertaService.sweetAlert('error');
      }
    })
  }

  editarSeccion = () => {
    const editarSeccion: EditarSeccion = {
      idAperturaSeccion: this.seccionEdit.idAperturaSeccion,
      detalleObservacion: this.formSeccion.value.observacion,
      nVacantes: this.formSeccion.value.vacantes,
      discapacidad: this.formSeccion.value.discapacidad,
      idUsuario: parseInt(this.authSignal.currentRol().id),
    }; 
    this.repository.editarSeccion(editarSeccion).subscribe({
      next: (editar) => {
        this.alertaService.sweetAlert('success', 'Correcto', 'Sección editada correctamente');
        this.cerrarFormulario.emit('Edit');
        this.loading = false
      },
      error: () => {
        this.alertaService.sweetAlert('error');
      }
    });
  }
  cancelarAdd = () => {
    this.cerrarFormulario.emit('Cancelar');
  }
}
