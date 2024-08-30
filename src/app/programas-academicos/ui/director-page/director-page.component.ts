import { Component, TemplateRef, WritableSignal } from '@angular/core';
import { DirectorListComponent } from './director-list/director-list.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Programa, ProgramaFacultad } from '../../domain/models/programa.model';
import { ProgramaSignal } from '../../domain/signals/programa.signal';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorSignal } from '../../domain/signals/director.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

@Component({
  selector: 'app-director-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, DirectorListComponent ],
  templateUrl: './director-page.component.html',
  styleUrl: './director-page.component.scss'
})
export class DirectorPageComponent {

  programaSelect: WritableSignal<ProgramaFacultad> = this.programaSignal.programaSelect;
  
  directorSelect: WritableSignal<UsuarioRol> = this.signal.directorSelect;


  constructor(
    // private repository: LocalRepository,
    private alertService: AlertService,
    private programaSignal: ProgramaSignal,
    // private dialog: MatDialog,
    private modal: UiModalService,
    private signal: DirectorSignal,
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  openModalDirector = ( template: TemplateRef<any> ) => {
    console.log('abrir modal director list');
    const dialogRef = this.modal.openTemplate( {
      template,
      titulo: 'Seleccionar Director de Escuela'
      // height: '460px',
    } ).afterClosed().subscribe( resp => {
      if( resp == 'cancelar' ) {
        this.programaSelect.set( this.programaSignal.programa )
        return;
      }

      // this.obtenerSemestres();
    })
  }

}

