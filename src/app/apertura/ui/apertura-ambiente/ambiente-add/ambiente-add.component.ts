import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { EditarAmbiente, InsertarAmbiente, ListarAmbientes } from 'src/app/apertura/domain/models/apertura-ambiente.model';
import { EliminarTipoAmbiente, ListarTipoAmbiente } from 'src/app/apertura/domain/models/apertura-seccion.model';
import { AperturaAmbienteRepository } from 'src/app/apertura/domain/repositories/apertura-ambiente.repository';
import { AperturaSeccionRepository } from 'src/app/apertura/domain/repositories/apertura-secciones.repository';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';
import { AperturaSeccionesSignal } from 'src/app/apertura/domain/signal/apertura-secciones.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AmbienteValidation } from 'src/app/apertura/domain/validations/ambientes.validation';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-ambiente-add',
  standalone: true,
  imports: [SharedModule, UiButtonComponent, UiInputComponent, CommonModule, UiLoadingProgressBarComponent],
  templateUrl: './ambiente-add.component.html',
  styleUrl: './ambiente-add.component.scss'
})
export class AmbienteAddComponent implements OnInit {

  loading : boolean = false
  renderizar = this.ambienteSignal.renderizarPor
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  formSelectedTipo = new FormControl<ListarTipoAmbiente[]>([]);
  selectedChips: ListarTipoAmbiente[] = [];

  listaFormato = this.seccionSignal.listaFormato;
  listarTipoAmbiente = this.seccionSignal.listaTipoAmbiente;
  ambienteSelected = this.ambienteSignal.ambienteSelected
  formAmbiente: FormGroup;

  /* Validaciones */
  maxLengthNombre = this.ambienteValidation.maxLengthNombre;
  minLengthNombre = this.ambienteValidation.minLengthNombre;

  maxLengthPabellon = this.ambienteValidation.maxLengthPabellon;
  minLengthPabellon = this.ambienteValidation.minLenghtPabellon;
  expRegPabellonToLockInput : RegExp = this.ambienteValidation.expRegPabellonToLockInput;

  maxNivel = this.ambienteValidation.maxNivel;
  minNivel = this.ambienteValidation.minNivel;
  maxLengthNivel = this.ambienteValidation.maxLengthNivel;
  expRegNivelToLockInput = this.ambienteValidation.expRegNivelToLockInput

  minAforo = this.ambienteValidation.minAforo;
  maxLengthAforo = this.ambienteValidation.maxLengthAforo;
  expRegAforoToLockInput = this.ambienteValidation.expRegAforoToLockInput;

  maxLenghtDescripcion = this.ambienteValidation

  listaCamposFormulario: string[] = ['nombre', 'pabellon','nivel', 'aforo', 'formato']
  constructor(
    private modal: UiModalService,
    private authSignal: AuthSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private ambienteRepository: AperturaAmbienteRepository,
    private ambienteValidation: AmbienteValidation,
    private alertaService:AlertService,
    private seccionSignal: AperturaSeccionesSignal,
    private ambienteSignal : AperturaAmbienteSignal,
    private seccionRepository: AperturaSeccionRepository,
    private deshabilitarInputsFormService: DeshabilitarInputsFormularioService,
  ){
    this.formAmbiente = new FormGroup({
      discapacidad: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre)]),
      descripcion: new FormControl('', [Validators.required]),
      pabellon: new FormControl('', [Validators.required]),
      nivel: new FormControl('', [Validators.required, Validators.min(this.minNivel)]),
      aforo: new FormControl( '', [Validators.required, Validators.min(this.minAforo)]),
      // formato : new FormControl( '', [Validators.required])
    })

    this.deshabilitarInputsFormService.inicializarInputs(this.formAmbiente, this.listaCamposFormulario, 0);
    this.deshabilitarInputsFormService.controlarInputs(this.formAmbiente, this.listaCamposFormulario)

  }

  ngOnInit(): void {
    this.patchValue();
    this.obtenerFormato()

  // Escuchar los cambios en 'nombre' y 'pabellon' directamente
  this.formAmbiente.get('nombre')?.valueChanges.subscribe(() => {
    this.actualizarDescripcion();
  });

  this.formAmbiente.get('pabellon')?.valueChanges.subscribe(() => {
    this.actualizarDescripcion();
  });
    
  }
  actualizarDescripcion = () => {
    const nombre = this.formAmbiente.get('nombre')?.value || '';
    const pabellon = this.formAmbiente.get('pabellon')?.value || '';
    
    // Actualizar el campo 'descripcion' concatenando nombre y pabellon con un guion
    const descripcion = `${nombre} - ${pabellon}`;
    this.formAmbiente.get('descripcion')?.setValue(descripcion);
  }

  patchValue = () => {
    this.formAmbiente.patchValue({
      discapacidad: this.ambienteSelected().discapacidad,
      nombre : this.ambienteSelected().nombreAmbiente,
      descripcion: this.ambienteSelected().nombreAmbiente + '-' + this.ambienteSelected().nombrePabellon,
      pabellon: this.ambienteSelected().nombrePabellon,
      nivel: this.ambienteSelected().nivelAmbiente,
      aforo: this.ambienteSelected().aforo
    })
  }

  obtenerFormato = () => {
    this.seccionRepository.obtenerFormato().subscribe({
      next: (formato) => {
        this.listaFormato.set(formato);
        // this.loading = false
      },
      error: () => {
        this.alertaService.showAlert('Ocurrió un error al insertar los formatos', 'error');
      }
    })
  }

  seleccionarFormato = (event: any): void => {
    const idFormato = event.value; // Objeto JSON completo
    this.obtenerTipoAmbiente(idFormato);
  }

  obtenerTipoAmbiente = (idFormato: number) => {
    // this.loading = true
    this.seccionRepository.obtenerTipoAmbiente(idFormato).subscribe(({
      next: (tipoAmbiente) => {
        this.listarTipoAmbiente.set(tipoAmbiente);
        // this.loading = false
      },
      error: () => {
        this.alertaService.showAlert('Ocurrió un error al listar los tipos de ambientes', 'error');
      }
    }))
  }

  updateSelectedTipo = () => {
    this.selectedChips = this.formSelectedTipo.value || [];
  }

  removerTipoAmbienteSeleccionado = (ambienteSeleccionado: ListarTipoAmbiente): void => {
    const selected = this.formSelectedTipo.value as ListarTipoAmbiente[];
    const index = selected.findIndex(option => option.idTipoAmbiente == ambienteSeleccionado.idTipoAmbiente);

    if (index >= 0) {
      selected.splice(index, 1);
      this.formSelectedTipo.setValue(selected); // Actualizar el control de formulario
    }
    this.updateSelectedTipo(); // Actualizar la lista de chips
  }

  isTipoAmbienteDisabled = (option: ListarTipoAmbiente): boolean => {
    const selectedTipos = this.formSelectedTipo.value || [];
    if (selectedTipos.length >= 1 && !selectedTipos.includes(option)) {
      return true; // Deshabilitar si ya hay 2 seleccionados y la opción no está seleccionada
    }
    return false; // Si no se cumplen las condiciones, no deshabilitar
  }  

  onSubmit = () => {
    const tipo = this.ambienteSelected().idAmbiente == 0 ? 'Crear' : 'Editar'
    this.alertaService.sweetAlert('question', 'Confirmar', `¿Está seguro que desea ${tipo} el ambiente?`)
    .then(isConfirm => {
      this.loading = true
      if(!isConfirm) {
        this.loading = false
        return};
      tipo == 'Crear' ? this.guardarAmbiente(): this.editarAmbiente()
    })
  }
  guardarAmbiente = () => {
    const tiposAmbienteSeleccionados = this.formSelectedTipo.value || [];
    const insertarAmbiente : InsertarAmbiente[] = tiposAmbienteSeleccionados.map((tipoAmbiente: ListarTipoAmbiente) =>({
      idSemestre : this.selectSemestreLocal().idSemestre,
      idLocal: this.selectSemestreLocal().codigoLocal,
      idTipoAmbiente: tipoAmbiente.idTipoAmbiente,
      aforo: this.formAmbiente.value.aforo,
      nivelAmbiente: this.formAmbiente.value.nivel,
      nombreAmbiente: this.formAmbiente.value.nombre,
      discapacidad: this.formAmbiente.value.discapacidad,
      nombrePabellon: this.formAmbiente.value.pabellon,
      idUsuario: parseInt(this.authSignal.currentRol().id)
    }))

    console.log(insertarAmbiente,'insetando...');
      this.ambienteRepository.insertarAmbiente(insertarAmbiente).subscribe({
        next: () => {
          this.alertaService.showAlert('Ambiente insertado correctamnete', 'success')
          this.modal.getRefModal().close('Add');
          this.renderizar.set('Renderizar')
          this.ambienteSelected.set(this.ambienteSignal.ambienteDefault)
          this.loading = false
        }, error: (error) => {
          this.alertaService.showAlert('Ocurrió un error al insertar el ambiente', 'error');
          this.loading = false
          console.log(error);
        }
      })

  }

  editarAmbiente = () => {
    const editarAmbiente : EditarAmbiente = {
      idAmbiente: this.ambienteSelected().idAmbiente,
      aforo: this.formAmbiente.value.aforo,
      nivelAmbiente: this.formAmbiente.value.nivel,
      nombreAmbiente: this.formAmbiente.value.nombre,
      discapacidad: this.formAmbiente.value.discapacidad,
      nombrePabellon: this.formAmbiente.value.pabellon,
      idUsuario: parseInt(this.authSignal.currentRol().id)
    }
    this.ambienteRepository.editarAmbiente(editarAmbiente).subscribe({
      next:(data) => {
        this.alertaService.showAlert('Ambiente editado correctamnete', 'success')
          this.modal.getRefModal().close('Edit');
          this.renderizar.set('Renderizar');
          this.ambienteSelected.set(this.ambienteSignal.ambienteDefault)
          this.loading = false
      }, error: (error) => {
        this.alertaService.showAlert('Ocurrió un error al editar el ambiente', 'error');
        this.loading = false
        console.log(error);
      }
    })
  }
}
