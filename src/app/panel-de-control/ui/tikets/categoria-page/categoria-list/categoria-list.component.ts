import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';

import { UiButtonIconComponent } from "../../../../../core/components/ui-button-icon/ui-button-icon.component";
import { CategoriaAddComponent } from '../categoria-add/categoria-add.component';
import { CategoriaSignal } from 'src/app/panel-de-control/domain/signals/categoria.signal';
import { CategoriaRepository } from 'src/app/panel-de-control/domain/repositories/categoria.repository';
import { AlertService } from 'src/app/demo/services/alert.service';

@Component({
  selector: 'categoria-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CategoriaAddComponent,
    UiButtonComponent,
    UiButtonIconComponent,
  ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriaListComponent {

  categorias = this.signal.categorias;
  newCategoria = this.signal.newCategoria;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'action'];
  dataSource = new MatTableDataSource(this.categorias());
  showFormAdd = this.signal.showFormAdd;
  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // table search filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }

  constructor(
    private signal: CategoriaSignal,
    private alert: AlertService,
  ) {

  }

  

}
