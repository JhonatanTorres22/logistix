import { Component } from '@angular/core';
import { ListProveedorComponent } from './list-proveedor/list-proveedor.component';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [ListProveedorComponent],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.scss'
})
export class ProveedorComponent {

}
