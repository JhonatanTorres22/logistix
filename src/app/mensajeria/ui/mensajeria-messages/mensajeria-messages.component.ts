import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MensajeriaNoMessagesComponent } from '../mensajeria-no-messages/mensajeria-no-messages.component';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { MensajeriaComposeComponent } from '../mensajeria-compose/mensajeria-compose.component';
import { MensajeriaResponseComponent } from '../mensajeria-response/mensajeria-response.component';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuarioRol, UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { MensajeriaCerrarArchivar, MensajeriaHistorialMensajes } from '../../domain/models/mensajeria.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';

@Component({
  selector: 'mensajeria-messages',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule,
    MensajeriaNoMessagesComponent,
    MensajeriaComposeComponent,
    MensajeriaResponseComponent  
  ],
  templateUrl: './mensajeria-messages.component.html',
  styleUrl: './mensajeria-messages.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class MensajeriaMessagesComponent {

  @Input() star = false;
  @Input() unStar = true;
  showFormCompose: boolean = false;
  readonly panelOpenState = signal(false);
  
  mensajesHistorial = this.mensajeriaSignal.mensajesHistorial;
  tipoBandeja = this.mensajeriaSignal.tipoBandeja;  

  constructor(
    private mensajeriaSignal: MensajeriaSignal,
    private userRolRepository: UsuarioRolRepository,
    private repository: MensajeriaRepository,
    private alert: AlertService
  ) {}

  onResponder() {
    this.showFormCompose = true;
    console.log('mostrar');
    
  }

  onAltaConfirm( mensaje: MensajeriaHistorialMensajes ) {

    this.alert.sweetAlert( 'question', 'Confirmación', `¿Está seguro que desea DAR DE ALTA al Director de Escuela?`)
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        const directorAlta: UsuarioRolAlta = {
          idRol: parseInt( mensaje.informacionAdicional ),
          usuarioId: 1
        }

        this.onAlta( directorAlta, mensaje )

      })

  }


  onAlta( userAlta: UsuarioRolAlta, mensaje: MensajeriaHistorialMensajes ) {
    // console.log(userRol);
    
    
    this.userRolRepository.darAltaRolUser( userAlta ).subscribe({
      next: ( data ) => {
        const mensajeCerrar: MensajeriaCerrarArchivar = {
          idMensaje: mensaje.idMensaje
        }
        this.cerrarArchivar( mensajeCerrar );
        this.alert.showAlert('El Director fué dado de ALTA, y el Mensaje fué CERRADO y ARCHIVADO.', 'success');
        console.log('No tenía Alta, ahora si está dado de ALTA');
        this.mensajeriaSignal.renderizarMensajes.set( 'Alta' );
        this.mensajeriaSignal.setMensajeriaDataAsignacionDefault();
      }, error: ( error ) => {
        this.alert.showAlert('Ocurrió un error al dar de alta al decano:' + error, 'error');
      }
    })
  }

  cerrarArchivar( mensaje: MensajeriaCerrarArchivar ) {
    this.repository.cerrarArchivarMensaje( mensaje ).subscribe({
      next: ( data ) => {
        console.log(data);
        console.log('Mensaje CERRADO Y ARCHIVADO.');
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al ARCHIVAR el mensaje: ' + error, 'error');
      }
    })
  }

}
