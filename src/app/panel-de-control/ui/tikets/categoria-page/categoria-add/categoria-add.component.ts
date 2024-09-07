import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiButtonIconComponent } from "../../../../../core/components/ui-button-icon/ui-button-icon.component";
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CategoriaValidator } from 'src/app/panel-de-control/domain/validators/categoria.validator';
import { CategoriaRepository } from 'src/app/panel-de-control/domain/repositories/categoria.repository';
import { CategoriaSignal } from 'src/app/panel-de-control/domain/signals/categoria.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { Categoria } from 'src/app/panel-de-control/domain/models/categoria.model';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
import { UiInputtComponent } from 'src/app/core/components/ui-inputt/ui-inputt.component';

@Component({
  selector: 'categoria-add',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonIconComponent,
    UiButtonComponent,
    UiInputtComponent,
    UiButtonIconComponent],
  templateUrl: './categoria-add.component.html',
  styleUrl: './categoria-add.component.scss'
})
export class CategoriaAddComponent implements OnInit {

  formAdd: FormGroup;
  validatorNombre = this.validator.validatorNombre;
  validatorAbreviatura = this.validator.validatorAbreviatura;
  maxLengthNombre = this.validator.maxLengthNombre;
  minLengthNombre = this.validator.minLengthNombre;
  expRegNombre = this.validator.expRegNombre;
  expRegNombreInput = this.validator.expRegNombreInput;

  renderizarCategorias = this.signal.renderizarCategorias;
  showFormAdd = this.signal.showFormAdd;
  categoriaEdit = this.signal.categoriaEdit;

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private validator: CategoriaValidator,
    private repository: CategoriaRepository,
    private signal: CategoriaSignal,
    private modal: UiModalService,
    private disable: DeshabilitarInputsFormularioService,
  ) {
    this.formAdd = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern( this.validatorNombre.expReg )]),
      abreviatura: new FormControl('', [Validators.required, Validators.pattern( this.validatorAbreviatura.expReg )]),
    });
    const controlNames = Object.keys(this.formAdd.controls);

    this.disable.inicializarInputs(this.formAdd, controlNames,0);
    this.disable.controlarInputs(this.formAdd, controlNames)
  }
  
  ngOnInit(): void {
    if( this.categoriaEdit().id != 0 ) {
      this.pathValues()
    }
    // const data = this.formAdd.controls;
    // console.log( controlNames );
    
  }

  pathValues = () => {
    this.formAdd.patchValue({
      nombre: this.categoriaEdit().nombre,
      abreviatura: this.categoriaEdit().abreviatura
    })
  }

  onSubmit = () => {
    if( !this.formAdd.valid ) {
      return
    }

    this.alert.sweetAlert('question', 'Confirmación', `Está seguro que desea ${ this.categoriaEdit().id !== 0 ? 'editar' : 'agregar' } la categoria ${ this.formAdd.value.nombre }`)
      .then( isConfirm => {
        if( !isConfirm ) return

        this.categoriaEdit().id !== 0 ? this.editar(  ) : this.guardar();
        
      })

  }

  editar = ( editar?: Categoria ) => {
    // console.log( editar );
    this.alert.sweetAlert('info', 'IMPLEMENTACIÓN PENDIENTE.... FALTA API.....');
    return;
    
  }

  guardar = () => {
    console.log('guardar');
    console.log( this.formAdd.value );

    this.repository.insertarCategoria( this.formAdd.value ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('La categoría se insertó correctamente.', 'success', 6);
        this.limpiarForm();
        this.renderizarCategorias.set('Listar');
        this.modal.getRefModal().close('Add');
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al insertar la categoria', 'error', 6);
      }
    });
    
  }

  limpiarForm = () => {
    // this.formAdd.get('nombre')?.clearValidators();
    // this.formAdd.get('abreviatura')?.clearValidators();
    this.showFormAdd.set( false );
    this.formAdd.reset();
  }
}
