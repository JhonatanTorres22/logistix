import { Component, OnInit } from '@angular/core';
import { ProveedorSignal } from '../../domain/signals/proveedor.signal';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/demo/services/alert.service';
import { ProveedorCrear, ProveedorEditar } from '../../domain/models/proveedor.model';
import { ProveedorRepository } from '../../domain/repositories/proveedor.repository';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { ProveedorValidation } from '../../domain/validation/proveedor.validation';

@Component({
  selector: 'app-add-edit-proveedor',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent, UiInputComponent],
  templateUrl: './add-edit-proveedor.component.html',
  styleUrl: './add-edit-proveedor.component.scss'
})
export class AddEditProveedorComponent implements OnInit {
  formProveedor: FormGroup;
  proveedorSelect = this.signal.proveedorSelect;

  expRegRuc : RegExp = this.validation.expRegRuc;
  expRegNombreRs : RegExp = this.validation.expRegNombreRs;
  expRegDireccionFiscal : RegExp = this.validation.expRegDireccionFiscal;

  maxLengthRuc : number = this.validation.maxLengthRuc;
  maxLengthNombreRs : number = this.validation.maxLengthNombreRs;
  maxLengthDireccionFiscal : number = this.validation.maxLengthDireccionFiscal;

  minLengthRuc : number = this.validation.minLengthRuc;
  minLengthNombreRs : number = this.validation.minLengthNombreRs;
  minLengthDireccionFiscal : number = this.validation.minLengthDireccionFiscal;
  constructor(
    private validation: ProveedorValidation,
    private modal: UiModalService,
    private repository: ProveedorRepository,
    private signal: ProveedorSignal,
    private alert: AlertService
  ) {
    this.formProveedor = new FormGroup({
      nombreRs: new FormControl('', [Validators.required, Validators.minLength(this.minLengthNombreRs), Validators.maxLength(this.maxLengthNombreRs), Validators.pattern(this.expRegNombreRs)]),
      ruc: new FormControl('', [Validators.required, Validators.minLength(this.minLengthRuc), Validators.maxLength(this.maxLengthRuc), Validators.pattern(this.expRegRuc)]),
      direccionFiscal: new FormControl('', [Validators.required, Validators.minLength(this.minLengthDireccionFiscal), Validators.maxLength(this.maxLengthDireccionFiscal), Validators.pattern(this.expRegDireccionFiscal)]),
      tipo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.proveedorSelect().codigo !== 0 ? this.patchValueForm() : null;
  }

  guardar = () => {
    const accion: 'Editar' | 'Crear' = this.proveedorSelect().codigo !== 0 ? 'Editar' : 'Crear';
    if (this.formProveedor.invalid) { return; }
    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro de ${accion} el proveedor?`)
      .then(isConfirm => {
        if (!isConfirm) { return; }
        switch (accion) {
          case 'Editar':
            const edit: ProveedorEditar = {
              codigo: this.proveedorSelect().codigo,
              nombreRs: this.formProveedor.value.nombreRs,
              ruc: this.formProveedor.value.ruc,
              direccionFiscal: this.formProveedor.value.direccionFiscal,
              tipo: this.formProveedor.value.tipo,
            }
            console.log(edit);
            this.editar(edit)
            // this.alert.showAlert('Proveedor editado con éxito', 'success');
            break;
          case 'Crear':
            const add: ProveedorCrear = {
              nombreRs: this.formProveedor.value.nombreRs,
              ruc: this.formProveedor.value.ruc,
              direccionFiscal: this.formProveedor.value.direccionFiscal,
              tipo: this.formProveedor.value.tipo,
            }
            console.log(add);
            this.insertar(add)
            // this.alert.showAlert('Proveedor agregado con éxito', 'success');
            break;
        }
      })
  }

  insertar = (newProveedor: ProveedorCrear) => {
    this.repository.crear(newProveedor).subscribe({
      next: () => {
        this.alert.showAlert('Proveedor creado con éxito', 'success');
        this.modal.getRefModal().close('Add');
      },
      error: () => {
        this.alert.showAlert('Ocurrió un error al crear el proveedor', 'error');
      }
    })
  }

  editar = (editProveedor: ProveedorEditar) => {
    // Lógica para editar un proveedor existente
    this.repository.editar(editProveedor).subscribe({
      next: () => {
        this.alert.showAlert('Proveedor editado con éxito', 'success');
        this.modal.getRefModal().close('Edit');        
      },
      error: () => {
        this.alert.showAlert('Ocurrió un error al editar el proveedor', 'error');
      }
    })
  }
  patchValueForm = () => {
    this.formProveedor.patchValue({
      nombreRs: this.proveedorSelect().nombreRs,
      ruc: this.proveedorSelect().ruc.trim(),
      direccionFiscal: this.proveedorSelect().direccionFiscal,
      tipo: this.proveedorSelect().tipo,
    })
  }
}
