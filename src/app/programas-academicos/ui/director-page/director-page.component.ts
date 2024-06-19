import { Component, WritableSignal } from '@angular/core';
import { DirectorListComponent } from './director-list/director-list.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Programa, ProgramaFacultad } from '../../domain/models/programa.model';
import { ProgramaSignal } from '../../domain/signals/programa.signal';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorSignal } from '../../domain/signals/director.signal';

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
    private dialog: MatDialog,
    private signal: DirectorSignal,
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  openModalDirector = () => {
    console.log('abrir modal director list');
    const dialogRef = this.dialog.open( DirectorListComponent, {
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

