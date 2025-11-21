import { Component, OnInit } from '@angular/core';
import { ProveedorSignal } from '../../domain/signals/proveedor.signal';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/demo/services/alert.service';
import { ProveedorCrear, ProveedorEditar } from '../../domain/models/proveedor,model';
import { ProveedorRepository } from '../../domain/repositories/proveedor.repository';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

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
  constructor(
    private modal: UiModalService,
    private repository: ProveedorRepository,
    private signal: ProveedorSignal,
    private alert: AlertService
  ) {
    this.formProveedor = new FormGroup({
      nombreRs: new FormControl('', [Validators.required]),
      ruc: new FormControl('', [Validators.required]),
      direccionFiscal: new FormControl('', [Validators.required]),
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
      ruc: this.proveedorSelect().ruc,
      direccionFiscal: this.proveedorSelect().direccionFiscal,
      tipo: this.proveedorSelect().tipo,
    })
  }
}
