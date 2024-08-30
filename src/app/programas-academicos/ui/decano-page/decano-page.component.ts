import { Component, TemplateRef, WritableSignal } from '@angular/core';
import { Facultad } from '../../domain/models/facultad.model';
import { FacultadRepository } from '../../domain/repositories/facultad.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { FacultadSignal } from '../../domain/signals/facultad.signal';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { DecanoSignal } from '../../domain/signals/decano.signal';
import { DecanoListComponent } from './decano-list/decano-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Asignacion } from '../../domain/models/asignacion.model';
import { AsignacionSignal } from '../../domain/signals/asignacion.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

@Component({
  selector: 'decano-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, DecanoListComponent ],
  templateUrl: './decano-page.component.html',
  styleUrl: './decano-page.component.scss'
})
export class DecanoPageComponent {

  facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
  asignaciones: WritableSignal<Asignacion[]> = this.asignacionSignal.asignaciones;
  
  decanoSelect: WritableSignal<UsuarioRol> = this.signal.decanoSelect;


  constructor(
    // private repository: LocalRepository,
    private alertService: AlertService,
    private facultadSignal: FacultadSignal,
    private dialog: MatDialog,
    private signal: DecanoSignal,
    private modal: UiModalService,
    private asignacionSignal: AsignacionSignal
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  openModalDecanos = ( template: TemplateRef <any> ) => {
    console.log('abrir modal decanos list');
    this.modal.openTemplate( {
      template,
      titulo: 'Seleccione Decano de Facultad'
      // width: '800px',
      // height: '460px',
      // disableClose: true,
    } ).afterClosed().subscribe( data => {
      if( data == 'cancelar' ) return;

      // this.obtenerSemestres();
    })
  }

}

