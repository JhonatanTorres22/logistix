import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, WritableSignal, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MailData } from 'src/app/fake-data/mail';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { MensajeriaMessagesComponent } from '../mensajeria-messages/mensajeria-messages.component';
import { MensajeriaComposeComponent } from '../mensajeria-compose/mensajeria-compose.component';
import { MensajeriaDataAsignacion, MensajeriaEnviados, MensajeriaRecibidos } from '../../domain/models/mensajeria.model';
import { MensajeriaNoMessagesComponent } from '../mensajeria-no-messages/mensajeria-no-messages.component';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MensajeriaNewComponent } from '../mensajeria-new/mensajeria-new.component';

export interface PeriodicElement {
  images: string;
  name: string;
  text: string;
  symbol: string;
  date: string;
  promo: string;
  forums: string;
}

const ELEMENT_DATA: PeriodicElement[] = MailData;

@Component({
  selector: 'mensajeria-content',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    MensajeriaMessagesComponent,
    MensajeriaComposeComponent,
    MensajeriaNoMessagesComponent,
    MensajeriaNewComponent
  ],
  templateUrl: './mensajeria-content.component.html',
  styleUrl: './mensajeria-content.component.scss'
})
export class MensajeriaContentComponent implements OnInit {

  @Input() tipoBandeja: 'Recibidos' | 'Enviados' | 'Archivados';

  // public props
  titleContent = true;
  detailsContent = false;
  @Input() star = false;
  @Input() unStar = true;
  @Input() unImportant = true;
  @Input() important = false;
  @Input() paperClip = true;
  @Input() promotion = false;
  @Input() forums = false;
  @Input() common = true;
  // @Input() status = 'true';

  toggle = this.signal.toggle;

  displayedColumns: string[] = ['name']; //'select', 'text', 'symbol'
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  mensajesRecibidos = this.signal.mensajesRecibidos;
  mensajesEnviados = this.signal.mensajesEnviados;
  mensajesArchivados = this.signal.mensajesArchivados;
  selectMensaje = this.signal.selectMensaje;
  mensajesTotal = this.signal.mensajesRecibidosTotal;
  mensajesNoLeidos = this.signal.mensajesNoLeidos;
  showFormNuevoMensaje = this.signal.showFormNuevoMensaje;
  // tipoBandeja = 
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<MensajeriaRecibidos>(true, []);
  mensajeriaData: WritableSignal<MensajeriaDataAsignacion> = this.signal.mensajeriaInsertarDataAsignacion;
  modoTablet = this.signal.mensajeriaModoTablet;
  // mensajesRecibidos 
  constructor( 
    private signal: MensajeriaSignal,
    private repository: MensajeriaRepository,
    private alert: AlertService
  ) {
    effect( () => {

      console.log( 'uhmm',  );
      if( !this.modoTablet() ) {
        this.titleContent = true;
        this.detailsContent = false;
      }
      // console.log( this.bandeja );
      // console.log(this.mensajesEnviados());
      // localStorage.setItem('mensajeriaData', JSON.stringify(this.signal.mensajeriaAsignacionDefault))
      // this.mensajeriaData.update( () => this.signal.mensajeriaAsignacionDefault )
      this.signal.tipoBandeja.set( this.tipoBandeja );
      console.log(this.tipoBandeja);
      
      switch( this.tipoBandeja ) {
        case 'Recibidos': { 
          this.dataSource = new MatTableDataSource<MensajeriaRecibidos>(this.mensajesRecibidos());
          this.signal.setSeleccionarMensajeDefault();

        }; break;
        case 'Enviados': { 
          this.dataSource = new MatTableDataSource<MensajeriaEnviados>(this.mensajesEnviados()); 
          this.signal.setMensajeriaDataAsignacionDefault();
          this.signal.setSeleccionarMensajeDefault();
          // this.signal.mensajeriaInsertarDataAsignacion.set( this.signal.mensajeriaAsignacionDefault);
        }; break;
        case 'Archivados': {
          this.dataSource = new MatTableDataSource(this.mensajesArchivados()); 
          this.signal.setMensajeriaDataAsignacionDefault();
          this.signal.setSeleccionarMensajeDefault();

          // this.mensajeriaData.update( () => this.signal.mensajeriaAsignacionDefault )

        }; break;

      }
      // console.log(this.mensajesRecibidos().length);
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    // this.obtenerMensajesRecibidos();
    this.signal.setSeleccionarMensajeDefault();
  }

  // obtenerMensajesRecibidos = () => {
  //   this.repository.obtenerMensajesRecibidos().subscribe({
  //     next: ( mensajesRecibidos ) => {
  //       this.signal.setMensajesRecibidos( mensajesRecibidos );
  //       this.dataSource = new MatTableDataSource<MensajeriaRecibidos>(this.mensajesRecibidos());
  //       this.alert.showAlert('Listando mensajes...', 'success')
  //     }, error: ( error ) => {
  //       console.log(error);
  //       this.alert.showAlert('Ocurrio un error al obtener los mensajes: ' + error, 'error')
  //     }
  //   });
  // }

  // obtenerMensajesEnviados = () => {
  //   this.repository.obtenerMensajesEnviados().subscribe({
  //     next: ( mensajesEnviados ) => {
  //       this.signal.setMensajesEnviados( mensajesEnviados );
  //     }
  //   })
  // }



  // public method
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  // }

  //detailsContentShow
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

  mostrarHistorialMensajes( mail: MensajeriaRecibidos ) {

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
      }, error: ( error ) => {
        console.log(error);
        this.alert.showAlert('Ocurrio un error al abrir el mensaje: ' + error, 'error', 6);
      }
    })
  }

  backToMail() {
    this.detailsContent = false;
    this.titleContent = true;
  }

}

