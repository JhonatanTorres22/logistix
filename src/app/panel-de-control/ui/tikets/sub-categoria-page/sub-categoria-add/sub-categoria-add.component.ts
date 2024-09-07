import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputtComponent } from 'src/app/core/components/ui-inputt/ui-inputt.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SubCategoria, SubCategoriaInsertar } from 'src/app/panel-de-control/domain/models/subCategoria.model';
import { SubCategoriaRepository } from 'src/app/panel-de-control/domain/repositories/subCategoria.repository';
import { CategoriaSignal } from 'src/app/panel-de-control/domain/signals/categoria.signal';
import { SubCategoriaSignal } from 'src/app/panel-de-control/domain/signals/subCategoria.signal';
import { SubCategoriaValidator } from 'src/app/panel-de-control/domain/validators/subCategoria.validator';
import { SubCategoriaListComponent } from "../sub-categoria-list/sub-categoria-list.component";

@Component({
  selector: 'sub-categoria-add',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonComponent,
    UiInputtComponent,
    SubCategoriaListComponent
],
  templateUrl: './sub-categoria-add.component.html',
  styleUrl: './sub-categoria-add.component.scss'
})
export class SubCategoriaAddComponent {

  formAdd: FormGroup;
  validatorNombre = this.validator.validatorNombre;

  renderizarSubCategorias = this.signal.renderizarSubCategorias;
  showFormAddSubCategoria = this.signal.showFormAddSubCategoria;
  subCategoriaEdit = this.signal.subCategoriaEdit;
  categoriaSelected = this.categoriaSignal.categoriaSelected;
  constructor(
    private validator: SubCategoriaValidator,
    private fb: FormBuilder,
    private alert: AlertService,
    private signal: SubCategoriaSignal,
    private categoriaSignal: CategoriaSignal,
    private repository: SubCategoriaRepository,
    private modal: UiModalService,
  ) {

    this.formAdd = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength( this.validatorNombre.maxLength ), Validators.minLength( this.validatorNombre.minLength ), Validators.pattern( this.validatorNombre.expReg )])
    });



  }


  onSubmit = () => {
    if( !this.formAdd.valid ) {
      return
    }

    this.alert.sweetAlert('question', 'Confirmación', `Está seguro que desea ${ this.subCategoriaEdit().id !== 0 ? 'editar' : 'agregar' } la categoria ${ this.formAdd.value.nombre }`)
      .then( isConfirm => {
        if( !isConfirm ) return

        this.subCategoriaEdit().id !== 0 ? this.editar(  ) : this.guardar();
        
      })

  }

  cerrarForm = () => {
    this.showFormAddSubCategoria.set( false );
  }

  editar = ( editar?: SubCategoria ) => {
    // console.log( editar );
    this.alert.sweetAlert('info', 'IMPLEMENTACIÓN PENDIENTE.... FALTA API.....');
    return;
    
  }

  guardar = () => {
    console.log('guardar');
    console.log( this.formAdd.value );
    const newSubCategoria: SubCategoriaInsertar = {
      ...this.formAdd.value,
      categoriaId: this.categoriaSelected().id
    }
    this.repository.insertar( newSubCategoria ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('La categoría se insertó correctamente.', 'success', 6);
        this.limpiarForm();
        this.renderizarSubCategorias.set('Listar');
        // this.showFormAddSubCategoria.set( false );
        // this.modal.getRefModal().close('Add');
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al insertar la categoria', 'error', 6);
      }
    });
    
  }

  limpiarForm = () => {
    // this.formAdd.get('nombre')?.clearValidators();
    // this.formAdd.get('abreviatura')?.clearValidators();
    this.showFormAddSubCategoria.set( false );
    this.formAdd.reset();
  }


}
