import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaArchivados, MensajeriaRecibidos } from '../../domain/models/mensajeria.model';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { AlertService } from 'src/app/demo/services/alert.service';

@Component({
  selector: 'app-mensajeria-bandeja',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './mensajeria-bandeja.component.html',
  styleUrl: './mensajeria-bandeja.component.scss'
})
export class MensajeriaBandejaComponent {

  @Input() dataSource = new MatTableDataSource<any>();
  modoTablet = this.signal.mensajeriaModoTablet;
  titleContent = true;
  detailsContent = false;

  displayedColumns: string[] = ['name'];

  showFadeIn: boolean = false;
  constructor(
    private repository: MensajeriaRepository,
    private signal: MensajeriaSignal,
    private alert: AlertService
  ) {

  }


  mostrarHistorialMensajes( mail: MensajeriaArchivados ) {
    // this.signal.setSeleccionarMensajeDefault();
    this.showFadeIn = true;
 
    mail.leido ? '' : this.onLeido( mail );
    console.log('Ver mensaje', mail);
    this.obtenerHistorialMensajes( mail.idMensaje );
    this.signal.setSeleccionarMensaje( mail );
 

    if( this.modoTablet() ) {
      this.titleContent = !this.titleContent;
      this.detailsContent = !this.detailsContent;

      return;
    }
  }

  obtenerHistorialMensajes( idMensaje: number ) {
    console.log(idMensaje);
    
    this.repository.obtenerMensajesHistorial( idMensaje ).subscribe({
      next: ( mensajesHistorial ) => {
        console.log(mensajesHistorial);
        this.signal.setMensajesHistorial( mensajesHistorial );
        this.showFadeIn = false;

      }, error: ( error ) => {
        console.log(error);
        this.alert.showAlert('Ocurrio un error al abrir el mensaje: ' + error, 'error', 6);
        this.showFadeIn = false;

      }
    })
  }


  onLeido( mail: MensajeriaRecibidos ) {
    const leerMensaje = {
      idMensaje: mail.idMensaje
    }
    this.repository.leerMensaje( leerMensaje ).subscribe({
      next: ( data ) => {
        console.log(data, 'leido');
        mail.leido = true;
      }, error: ( error ) => {
        console.log('No se pudo leer el mensaje', error);
        this.alert.showAlert('No se pudo leer el mensaje: '+ error, 'error');
      }
    })
  }

}
