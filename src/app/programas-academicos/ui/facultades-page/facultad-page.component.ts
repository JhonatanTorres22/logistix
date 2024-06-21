import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { FacultadRepository } from '../../domain/repositories/facultad.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { FacultadListComponent } from './facultad-list/facultad-list.component';
import { MatDialog } from '@angular/material/dialog';
import { FacultadSignal } from '../../domain/signals/facultad.signal';
import { Facultad } from '../../domain/models/facultad.model';
import { AsignacionSignal } from '../../domain/signals/asignacion.signal';
import { Asignacion } from '../../domain/models/asignacion.model';

@Component({
  selector: 'facultad-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, FacultadListComponent],
  templateUrl: './facultad-page.component.html',
  styleUrl: './facultad-page.component.scss'
})
export class FacultadPageComponent implements OnInit {

  facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
  asignaciones: WritableSignal<Asignacion[]> = this.asignacionSignal.asignaciones;

  constructor(
    private facultadRepository: FacultadRepository,
    private alertService: AlertService,
    private dialog: MatDialog,
    private facultadSignal: FacultadSignal,
    private asignacionSignal: AsignacionSignal
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  openModalFacultad = () => {
    console.log('abrir modal facultad list');
    const dialogRef = this.dialog.open( FacultadListComponent, {
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
