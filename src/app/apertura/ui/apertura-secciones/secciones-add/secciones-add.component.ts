import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AgregarSeccion, AgregarTipoAmbienteASeccion, EditarSeccion, EliminarTipoAmbiente, ListarSecciones, ListarTipoAmbiente } from 'src/app/apertura/domain/models/apertura-seccion.model';
import { AperturaSeccionRepository } from 'src/app/apertura/domain/repositories/apertura-secciones.repository';
import { AperturaSeccionesSignal } from 'src/app/apertura/domain/signal/apertura-secciones.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SeccionValidation } from 'src/app/apertura/domain/validations/secciones.validation';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
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
  listaFormatoTeorico = this.seccionSignal.listaFormatoTeorico
  listaFormatoPractico = this.seccionSignal.listaFormatoPractico
  listaFormatoNoRequiere = this.seccionSignal.listaFormtatoNoRequire

  listarTipoAmbiente = this.seccionSignal.listaTipoAmbiente;
  listaTipoAmbienteTeorico = this.seccionSignal.listaTipoAmbienteTeorico
  listaTipoAmbientePractico = this.seccionSignal.listaTipoAmbientePractico

  formSelectedTipoPractico = new FormControl<any[]>([]);
  formSelectedTipoTeorico = new FormControl<any[]>([]);

  selectedChipsPractico: any[] = [];
  selectedChipsTeorico: any[] = [];

  ambientePracticoSeleccionado: ListarTipoAmbiente | null;
  habilitarGrupos: boolean = false;


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

  listaCamposFormulario: string[] = ['vacantes', 'formatoTeoria', 'tipoAmbienteTeoria','formatoPractica', 'tipoAmbientePractica', 'nGrupos']

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
      formatoTeoria: new FormControl('', [Validators.required]),
      tipoAmbienteTeoria: new FormControl('', [Validators.required]),
      formatoPractica: new FormControl('', [Validators.required]),
      tipoAmbientePractica: new FormControl('', [Validators.required]),
      nGrupos: new FormControl('', [Validators.required])
    })

    this.deshabilitarInputsFormService.inicializarInputs(this.formSeccion, this.listaCamposFormulario, 0);
    this.deshabilitarInputsFormService.controlarInputs(this.formSeccion, this.listaCamposFormulario)

    this.updateSelectedAmbiente()
  }


  ngOnInit(): void {
    this.obtenerFormato();
    this.seccionEdit ? this.pathValueForm() : '';
    if (!this.checkboxChecked) {
      this.formSeccion?.get('observacion')?.setValue('-');
    }
  }

  pathValueForm = () => {
    this.formSeccion.patchValue({
      observacion: this.seccionEdit.detalleObservacion.trim(),
      discapacidad: this.seccionEdit.discapacidad,
      vacantes: this.seccionEdit.nVacantes,
      formatoTeoria: this.seccionEdit.idFormatoTeoria,
      formatoPractica: this.seccionEdit.idFormatoPractica,
      tipoAmbienteTeoria: this.seccionEdit.idAmbienteTipoTeoria,
      tipoAmbientePractica : this.seccionEdit.idAmbienteTipoPractica,
      nGrupos: this.seccionEdit.numeroGrupos
    });

        // Cargar tipos de ambientes para los formatos iniciales
        if (this.seccionEdit.idFormatoTeoria) {
          console.log(this.seccionEdit);
          
          this.obtenerTipoAmbiente(this.seccionEdit.idFormatoTeoria, 'teorico');
      }
      if (this.seccionEdit.idFormatoPractica) {
          this.obtenerTipoAmbiente(this.seccionEdit.idFormatoPractica, 'practico');
      }
  }

  ambienteSeleccionado = (selectedId: number) => {
    // Encuentra la opción seleccionada
    const selectedOption = this.listaTipoAmbientePractico().find(
        (option) => option.idTipoAmbiente === selectedId
    );

    if (selectedOption) {
        this.ambientePracticoSeleccionado = selectedOption;
        this.habilitarGrupos = selectedOption.grupo;
    }
}


  // checkGrupoTrue() {
  //   this.mostrarCantidadGrupos = this.formSelectedTipoPractico.value?.some((tipo) => tipo.grupo === true) ?? false;
  // }

  // isTipoAmbienteDisabled(option: ListarTipoAmbiente): boolean {
  //   const selectedTipos = this.formSelectedTipoPractico.value || [];

  //   if (selectedTipos.length >= 2 && !selectedTipos.includes(option)) {
  //     return true; 
  //   }

  //   const grupoFalseSelected = selectedTipos.filter((tipo: any) => !tipo.grupo).length;

  //   if (grupoFalseSelected >= 2 && !option.grupo && !selectedTipos.includes(option)) {
  //     return true;
  //   }

  //   const grupoTrueSelected = selectedTipos.some((tipo: any) => tipo.grupo);

  //   if (grupoTrueSelected && option.grupo && !selectedTipos.includes(option)) {
  //     return true;
  //   }
  //   return false;
  // }

  obtenerFormato = () => {
    this.repository.obtenerFormato().subscribe({
      next: (formato) => {
        this.listaFormato.set(formato);
        this.loading = false;
        const formatosTeoricos = formato.filter(f => f.idFormato === 1 || f.idFormato === 2);
        this.listaFormatoTeorico.set(formatosTeoricos);

        if (this.cursoAperturado().hp === 0) {
          const formatosNoRequiere = formato.filter(f => f.idFormato === 4);
          this.listaFormatoPractico.set(formatosNoRequiere);
        } else if (this.cursoAperturado().hp > 0) {
          const formatosPracticos = formato.filter(f => [1, 2, 3].includes(f.idFormato));
          this.listaFormatoPractico.set(formatosPracticos);
        }
      },
      error: () => {
        this.alertaService.sweetAlert('error')
        this.loading = false;
      }
    })
  }

  seleccionarFormatoTeorico = (event: any): void => {
    const idFormato = event.value;
    this.selectedChipsTeorico = [];
    this.mostrarCantidadGrupos = false;
    this.formSelectedTipoTeorico.setValue([]);
    this.obtenerTipoAmbiente(idFormato, 'teorico'); // Pasamos el contexto
}

seleccionarFormatoPractico = (event: any): void => {
    const idFormato = event.value;
    this.selectedChipsPractico = [];
    this.mostrarCantidadGrupos = false;
    this.formSelectedTipoPractico.setValue([]);
    this.obtenerTipoAmbiente(idFormato, 'practico'); // Pasamos el contexto
}

obtenerTipoAmbiente = (idFormato: number, contexto: 'teorico' | 'practico'): void => {
  this.loading = true;
  this.repository.obtenerTipoAmbiente(idFormato).subscribe({
      next: (tipoAmbiente) => {
        console.log(tipoAmbiente,'tipo ambiente');
        
          if (contexto === 'teorico') {
              this.listaTipoAmbienteTeorico.set(
                  tipoAmbiente.filter(ambiente => ambiente.teoria || (ambiente.teoria && ambiente.practica))
              );
          } else if (contexto === 'practico') {
              this.listaTipoAmbientePractico.set(
                  tipoAmbiente.filter(ambiente => ambiente.practica || (ambiente.teoria && ambiente.practica))
              );
          }
          this.loading = false;
      },
      error: () => {
          this.alertaService.sweetAlert('error');
          this.loading = false;
      },
  });
};

updateSelectedAmbiente(): void {
  const ht = this.cursoAperturado().ht;
  const hp = this.cursoAperturado().hp;

  const formatoTeoriaControl = this.formSeccion.get('formatoTeoria');
  const tipoAmbienteTeoriaControl = this.formSeccion.get('tipoAmbienteTeoria');
  const formatoPracticaControl = this.formSeccion.get('formatoPractica');
  const tipoAmbientePracticaControl = this.formSeccion.get('tipoAmbientePractica');
  const nGruposControl = this.formSeccion.get('nGrupos');

  if (ht > 0 && hp === 0) {
    // Si ht > 0 y hp == 0, quitar validaciones de práctica
    formatoPracticaControl?.clearValidators();
    tipoAmbientePracticaControl?.clearValidators();
    nGruposControl?.clearValidators();
  } else if (ht === 0 && hp > 0) {
    // Si ht == 0 y hp > 0, quitar validaciones de teoría
    formatoTeoriaControl?.clearValidators();
    tipoAmbienteTeoriaControl?.clearValidators();
  }

  // Actualizar el estado de los controles
  formatoTeoriaControl?.updateValueAndValidity();
  tipoAmbienteTeoriaControl?.updateValueAndValidity();
  formatoPracticaControl?.updateValueAndValidity();
  tipoAmbientePracticaControl?.updateValueAndValidity();
  nGruposControl?.updateValueAndValidity();
}

  // removerTipoAmbienteSeleccionadoPractico(ambienteSeleccionado: ListarTipoAmbiente): void {
  //   const selected = this.formSelectedTipoPractico.value as ListarTipoAmbiente[];
  //   const index = selected.findIndex(option => option.idTipoAmbiente === ambienteSeleccionado.idTipoAmbiente);

  //   if (index >= 0) {
  //     selected.splice(index, 1);
  //     this.formSelectedTipoPractico.setValue(selected); // Actualizar el control de formulario
  //   }
  //   this.updateSelectedAmbiente();
  // }

  // removerTipoAmbienteSeleccionadoTeorico(ambienteSeleccionado: ListarTipoAmbiente): void {
  //   const selected = this.formSelectedTipoTeorico.value as ListarTipoAmbiente[];
  //   const index = selected.findIndex(option => option.idTipoAmbiente === ambienteSeleccionado.idTipoAmbiente);

  //   if (index >= 0) {
  //     selected.splice(index, 1);
  //     this.formSelectedTipoTeorico.setValue(selected); // Actualizar el control de formulario
  //   }
  //   this.updateSelectedAmbiente();
  // }

  obtenerNombreSeccion = (): string => {
    const cantidad = parseInt(String(this.listaSecciones().length), 10);
    const siguienteSeccion = String.fromCharCode(65 + cantidad);
    return siguienteSeccion;
  }

  mostrarCampoObservacion = () => {
    this.checkboxChecked = !this.checkboxChecked; // Cambia el estado
    if (!this.checkboxChecked) {
      this.formSeccion?.get('observacion')?.setValue('-');
    }
  }

  // eliminarTipoEstudioConfirm = (seccion: ListarSecciones, idTipoAmbienteEliminar: number) => {
  //   this.alertaService.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar el Tipo Ambiente?')
  //     .then(isConfirm => {
  //       if (!isConfirm) return
  //       this.loading = true
  //       let ambienteEliminar = seccion.ambiente.find(ambiente => ambiente.idTipoAmbiente === idTipoAmbienteEliminar);
  //       if (ambienteEliminar) {
  //         let eliminarTipoAmbiente: EliminarTipoAmbiente = {
  //           idAperturaSeccion: seccion.idAperturaSeccion,
  //           idTipoAmbiente: ambienteEliminar.idTipoAmbiente
  //         }
  //         this.eliminarTipoAmbiente(eliminarTipoAmbiente)
  //       }
  //     })
  // }

  // eliminarTipoAmbiente = (eliminarTipoAmbiente: EliminarTipoAmbiente) => {
  //   this.repository.eliminarTipoAmbiente(eliminarTipoAmbiente).subscribe({
  //     next: () => {
  //       this.alertaService.sweetAlert('success', '¡Correcto!', 'El tipo de ambiente fue eliminado exitosamente')
  //       this.cerrarFormulario.emit('DeleteTipoAmbiente')
  //       // this.seccionEdit.ambiente = this.seccionEdit.ambiente.filter(ambiente => ambiente.idTipoAmbiente !== eliminarTipoAmbiente.idTipoAmbiente);
  //       if (this.formSelectedTipoPractico?.value) {
  //         const newValue = this.formSelectedTipoPractico.value.filter(
  //           tipo => tipo.idTipoAmbiente !== eliminarTipoAmbiente.idTipoAmbiente
  //         );
  //         this.formSelectedTipoPractico.setValue(newValue);
  //       }
  //       this.loading = false
  //     }, error: (error) => {
  //       this.alertaService.sweetAlert('error', 'Error', 'Ocurrió un error al eliminar:' + error)
  //     }
  //   })
  // }

  onSubmit = () => {

    if (this.formSeccion.invalid ) {
      this.alertaService.showAlert('El formulario está incompleto o no cumple con los valores esperados');
      return;
    }

    const tipoAccionForm = this.seccionEdit.idAperturaSeccion !== 0 ? 'Editar' : 'Crear';

    this.alertaService.sweetAlert('question', 'Confirmación', `¿Está seguro que desea ${tipoAccionForm} la sección?`)
      .then(isConfirm => {
        if (!isConfirm) return;
        this.loading = true

        tipoAccionForm == 'Crear' ? this.guardarSeccion() : this.editarSeccion()        
      });
  }

  agregarTipoAmbiente = () => {
    const tiposAmbienteSeleccionados = this.formSelectedTipoPractico.value || [];
    if (tiposAmbienteSeleccionados.length === 0) {
      return;
    }
    const agregarTipoAmbiente: AgregarTipoAmbienteASeccion[] = tiposAmbienteSeleccionados.map((tipoAmbiente: ListarTipoAmbiente) => ({
      idAperturaSeccion: this.seccionEdit.idAperturaSeccion,
      idTipoAmbiente: tipoAmbiente.idTipoAmbiente, // ID del tipo de ambiente
      cantidadGrupos: tipoAmbiente.grupo ? this.formSeccion.value.nGrupos : 0 // Si grupo es true, asigna ngrupo; si no, asigna 0
    }));

    this.repository.agregarTipoAmbienteASeccion(agregarTipoAmbiente).subscribe({
      next: (agregarTipo) => {
        this.alertaService.showAlert('Se creó correctamente los tipos de ambientes', 'success')
      }, error: () => {
        this.alertaService.showAlert('Ocurrió un error al guardar los tipos de ambientes', 'error')
      }
    })
  }

  guardarSeccion = () => {
    const agregarSeccion: AgregarSeccion= {
      idAperturaCurso: this.cursoAperturado().idAperturaCurso,
      nombreSeccion: this.obtenerNombreSeccion(),
      discapacidad: this.formSeccion.value.discapacidad,
      cantidadVacantes: parseInt(this.formSeccion.value.vacantes),
      detalleObservacion: this.formSeccion.value.observacion,
      idTipoAmbienteTeoria: this.cursoAperturado().ht == 0 ? 7 : this.formSeccion.value.tipoAmbienteTeoria ,
      idTipoAmbientePractica: this.cursoAperturado().hp == 0 ? 7 : this.formSeccion.value.tipoAmbientePractica,
      cantidadGrupos: this.habilitarGrupos ? parseInt( this.formSeccion.value.nGrupos) : 0,
      idUsuario: parseInt(this.authSignal.currentRol().id)
    }

    console.log(agregarSeccion,'agregando');
    
    this.repository.insertarSecciones(agregarSeccion).subscribe({
      next: (agregaSeccion) => {       
        this.alertaService.sweetAlert('success', '¡Correcto!', 'La sección fue creada exitosamente')
        this.cerrarFormulario.emit('Add');
        this.renderizarPor.set('RenderizarCurso')
        console.log(this.renderizarPor(), 'renderizar por');
        this.loading = false
      },
      error: (e) => {
        this.alertaService.sweetAlert('error');
        this.loading = false
        console.log(e);
        
      }
    })
  }

  editarSeccion = () => {
    const editarSeccion: EditarSeccion = {
      idAperturaSeccion: this.seccionEdit.idAperturaSeccion,
      nombreSeccion: this.seccionEdit.nombreSeccion,
      discapacidad: this.formSeccion.value.discapacidad,
      cantidadVacantes: this.formSeccion.value.vacantes,
      detalleObservacion: this.formSeccion.value.observacion,
      idTipoAmbienteTeoria: this.formSeccion.value.tipoAmbienteTeoria,
      idTipoAmbientePractica: this.formSeccion.value.tipoAmbientePractica,
      cantidadGrupos: this.cursoAperturado().ht > 0 && this.cursoAperturado().hp == 0 ? 0 : parseInt(this.formSeccion.value.nGrupos),
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
        this.loading = false
      }
    });
  }
  cancelarAdd = () => {
    this.cerrarFormulario.emit('Cancelar');
  }
}
