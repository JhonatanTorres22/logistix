import { Component, WritableSignal } from '@angular/core';
import { Programa, ProgramaFacultad } from '../../domain/models/programa.model';
import { ProgramaRepository } from '../../domain/repositories/programa.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgramaSignal } from '../../domain/signals/programa.signal';
import { ProgramaAcademicoListComponent } from './programa-list/programa-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';

@Component({
  selector: 'programa-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, ProgramaAcademicoListComponent, UiButtonComponent, UiInputComponent],
  templateUrl: './programa-page.component.html',
  styleUrl: './programa-page.component.scss'
})
export class ProgramaAcademicoPageComponent {

  programaSelect: WritableSignal<ProgramaFacultad> = this.programaSignal.programaSelect;


  constructor(
    private programaRepository: ProgramaRepository,
    private alertService: AlertService,
    private dialog: MatDialog,
    private programaSignal: ProgramaSignal,
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  openModalPrograma = () => {
    console.log('abrir modal programa list');
    const dialogRef = this.dialog.open( ProgramaAcademicoListComponent, {
      width: '800px',
      height: '460px',
      disableClose: true,
    } );

    dialogRef.afterClosed().subscribe( data => {
      if( data == 'cancelar' ) return;

      // this.obtenerSemestres();
    })
  }

}
