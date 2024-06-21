import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Local } from '../../domain/models/local.model';
import { LocalRepository } from '../../domain/repositories/local.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { LocalSignal } from '../../domain/signals/local.signal';
import { LocalListComponent } from './local-list/local-list.component';

@Component({
  selector: 'local-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './local-page.component.html',
  styleUrl: './local-page.component.scss'
})
export class LocalPageComponent {

  localSelect: WritableSignal<Local> = this.signal.localSelect;
  localesSelect: WritableSignal<Local[]> = this.signal.localesSelect;

  constructor(
    // private repository: LocalRepository,
    private alertService: AlertService,
    private dialog: MatDialog,
    private signal: LocalSignal,
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  openModalLocal = () => {
    console.log('abrir modal programa list');
    const dialogRef = this.dialog.open( LocalListComponent, {
      width: '800px',
      height: '460px',
      disableClose: true,
    } );

    dialogRef.afterClosed().subscribe( data => {
      if( data == 'cancelar' ) return;

      // this.obtenerSemestres();
    })
  }

  abrirUbicacionLocal(latitud: number, longitud: number) {
    const url = `https://www.google.com/maps?q=${latitud},${longitud}`;
    window.open(url, '_blank');
  }

}
