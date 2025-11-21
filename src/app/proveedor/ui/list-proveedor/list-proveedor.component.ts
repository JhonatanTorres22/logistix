import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Proveedor, ProveedorEliminar } from '../../domain/models/proveedor,model';
import { ProveedorRepository } from '../../domain/repositories/proveedor.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProveedorSignal } from '../../domain/signals/proveedor.signal';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProveedorComponent } from '../add-edit-proveedor/add-edit-proveedor.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

@Component({
  selector: 'app-list-proveedor',
  standalone: true,
  imports: [SharedModule, AddEditProveedorComponent],
  templateUrl: './list-proveedor.component.html',
  styleUrl: './list-proveedor.component.scss'
})
export class ListProveedorComponent implements OnInit {

  proveedorList = this.signal.proveedorList
  proveedorSelect = this.signal.proveedorSelect;
  proveedorDefault = this.signal.proveedorDefault
  proveedores: Proveedor[] = [];
  displayedColumns: string[] = ['nombreRs', 'ruc', 'direccionFiscal', 'tipo', 'acciones'];
  dataSource = new MatTableDataSource(this.proveedores);
  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private signal: ProveedorSignal,
    private repository: ProveedorRepository,
    private alert: AlertService,
    private modal: UiModalService
  ) { }

  ngOnInit(): void {
    this.obtenerProveedores()
  }

  obtenerProveedores = () => {
    this.repository.obtener().subscribe({
      next: (proveedor) => {
        this.proveedorList.set(proveedor)
        this.dataSource.data = this.proveedorList()
        console.log(proveedor);
        this.alert.showAlert('Proveedores cargados con éxito', 'success');
      },

      error: () => {
        this.alert.showAlert('Ocurrió un error al cargar los proveedores', 'error');
      }
    })
  }

  openModalProveedor = (proveedor: Proveedor) => {
    this.proveedorSelect.set(proveedor)
    const dialogRef = this.dialog.open(AddEditProveedorComponent, {
      width: '400px',
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'cancelar') { return }
      this.obtenerProveedores()
    })
  }

  addEditModalProveedor = (template: TemplateRef<any>,proveedor: Proveedor) => {
   this.proveedorSelect.set(proveedor)
    this.modal.openTemplate({
      template,
      titulo : this.proveedorSelect().codigo !== 0 ? 'Editar Proveedor' : 'Agregar Proveedor',
    }).afterClosed().subscribe( ( result ) => {
      if( result == 'cancelar' ) { return; }
      this.obtenerProveedores()
    } );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarConfirm = (proveedor : Proveedor) => {
   this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar el proveedor?').
   then( isConfirm => {
    if( !isConfirm ) return;
    const eliminarProveedor: ProveedorEliminar = {
      codigo: proveedor.codigo,
    }
    this.eliminar( eliminarProveedor );
   });
  }

  eliminar = (proveedor : ProveedorEliminar) => {
    this.repository.eliminar(proveedor).subscribe({
      next: () => {
        this.alert.showAlert('Proveedor eliminado con éxito', 'success');
        this.obtenerProveedores();
      },
      error: () => {
        this.alert.showAlert('Ocurrió un error al eliminar el proveedor', 'error');
      }
    })
  }
}
