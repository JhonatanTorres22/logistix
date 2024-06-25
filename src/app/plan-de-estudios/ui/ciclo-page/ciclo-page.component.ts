import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CicloListComponent } from './ciclo-list/ciclo-list.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ciclo-page',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    CicloListComponent,
    UiButtonComponent,
    CicloListComponent
  ],
  templateUrl: './ciclo-page.component.html',
  styleUrl: './ciclo-page.component.scss'
})
export class CicloPageComponent {

  constructor(
    private dialog: MatDialog,

  ) {

  }

  openModalCiclo() {
    this.dialog.open( CicloListComponent, {
      width: '800px',
      disableClose: true,
      closeOnNavigation: false,
      
    } )
  }

}
