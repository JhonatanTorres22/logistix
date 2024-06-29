import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { MensajeriaInsertar, TipoMensaje } from '../../domain/models/mensajeria.model';
import { RolUserId } from 'src/app/core/mappers/rolUserId';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { AuthService } from 'src/app/auth/infraestructure/services/auth.service';
import { AuthDomainService } from 'src/app/auth/domain/services/auth-domain.service';

@Component({
  selector: 'mensajeria-compose',
  standalone: true,
  imports: [ CommonModule, SharedModule, QuillModule, UiButtonComponent ],
  templateUrl: './mensajeria-compose.component.html',
  styleUrl: './mensajeria-compose.component.scss'
})
export class MensajeriaComposeComponent implements OnInit {

  mensaje: string;
  mensajeriaInsert = this.signal.mensajeriaInsertar;
  mensajeriaDataAsignacion = this.signal.mensajeriaInsertarDataAsignacion;

  decano: string = this.signal.mensajeriaInsertarDataAsignacion().asignacion.nombreDecano;
  idDecano: number = this.signal.mensajeriaInsertarDataAsignacion().asignacion.idDecano;
  facultad: string = this.signal.mensajeriaInsertarDataAsignacion().asignacion.nombreFacultad;
  idFacultad: number = this.signal.mensajeriaInsertarDataAsignacion().asignacion.idFacultad;
  programa: string = this.signal.mensajeriaInsertarDataAsignacion().asignacion.programas[0].nombrePrograma;
  idPrograma: number = this.signal.mensajeriaInsertarDataAsignacion().asignacion.programas[0].idPrograma;
  director: string = this.signal.mensajeriaInsertarDataAsignacion().asignacion.programas[0].nombreDirector;
  idDirector: number = this.signal.mensajeriaInsertarDataAsignacion().asignacion.programas[0].idDirector;
  semestre: string = this.signal.mensajeriaInsertarDataAsignacion().semestre.codigo;
  tipoMensaje: TipoMensaje = this.signal.mensajeriaInsertarDataAsignacion().tipoMensaje;

  paraRolNombreArea: string;
  paraRolNombrePersona: string;
  tipo: string = `${ this.tipoMensaje } `
  asunto: string;

  constructor( 
    private signal: MensajeriaSignal,
    private repository: MensajeriaRepository,
    private alert: AlertService,
    private userRolRepository: UsuarioRolRepository,
    private authDomainService: AuthDomainService
  ) {}

  ngOnInit(): void {
    console.log(this.paraRolNombrePersona);
    
    switch( this.tipoMensaje ) {
      case 'DAR ALTA A DIRECTOR DE ESCUELA': {
        this.paraRolNombreArea = `DECANO DE ${ this.facultad.toUpperCase() }`;
        this.paraRolNombrePersona = this.decano;
        this.asunto = `${ this.tipoMensaje } ${ this.programa } ${ this.semestre }`;
        this.mensaje = `<p>Estimado ${ this.decano },</p><p> sirva la presente para saludarlo y a su vez solicitar dar de Alta al <strong> DR. ${ this.director }</strong> quien a sido designado como Director de la Escuela Profesional de <strong>${ this.programa }.</strong></p><p>Agradezco de antemano su atención.</p><p>Saludos.</p>`
      }; break;

      case 'VALIDAR PLAN DE ESTUDIOS': {
        this.paraRolNombreArea = `DECANO DE ${ this.facultad.toUpperCase() }`;
      }; break;

      case 'NO SELECCIONADO': {
        console.log(' No seleccionado... ');
        
      }; break;
    }
  }



  enviarConfirm = () => {

    this.alert.sweetAlert('question', 'Confirmación', `Al enviar el mensaje, se le dará de Alta al usuario ${ this.decano } con el Rol de DECANO DE FACULTAD, ¿Está seguro que desea enviar el mensaje?`)
      .then( isConfirm => {
        if( !isConfirm ) return

        const mensajeInsertar: MensajeriaInsertar = {
          tipoMensaje: 1,
          asunto: this.asunto,
          emisorId: RolUserId.currentIdRolUser,
          receptorId: this.idDecano,
          leido: false,
          menssage: this.mensaje.trim(),
          informacionAdicional: this.idDirector.toString(),
          usuarioId: parseInt( this.authDomainService.currentRol().id )
        }
        // this.mensajeriaSignal.setMensajeriaInsertar( mensajeInsertar );
        // console.log(mensajeInsertar);
        this.enviarMensaje( mensajeInsertar );
      });

    
  }

  enviarMensaje( mensaje: MensajeriaInsertar ) {
    console.log(mensaje);
    // this.signal.renderizarMensajes.set( 'Enviados' );
    
    this.repository.insertar( mensaje ).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('El mensaje se envió correctamente', 'success', 6);
        const decano: UsuarioRolAlta = {
          idRol: this.idDecano,
          usuarioId: 1
        }
        
        this.isAlta( decano ).then( isAlta => {
          if( isAlta ) {
            this.signal.renderizarMensajes.set( 'Enviados' );
            this.signal.setMensajeriaDataAsignacionDefault();    
            return
          }

          this.darAltaDecano( decano );

        });
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al enviar el mensaje: ' + error, 'error', 2)
      }
    })
  }


  isAlta( decanoAlta: UsuarioRolAlta) {

    return new Promise<boolean>( ( resolve, reject ) => {

      this.userRolRepository.obtenerUsuariosRol().subscribe({
        next: ( usuariosConRol ) => {
          const decano = usuariosConRol.filter( rolDecano => rolDecano.id == this.idDecano );
          if( decano[0].alta == 'ALTA' ) {

            // this.alert.showAlert('El decano fué dado de ALTA', 'success');
            console.log('Ya tenía Alta');
            resolve( true )
            return
          }

          resolve( false )
  
        }, error: ( error ) => {
          console.log(error);
          this.alert.showAlert('Ocurrió un error al consultar el rol del usuario: ' + error, 'error');
        }
      });

    })
  }
  
  darAltaDecano( userRol: UsuarioRolAlta) {
    // console.log(userRol);
    
    this.userRolRepository.darAltaRolUser( userRol ).subscribe({
      next: ( data ) => {
        this.alert.showAlert('El decano fué dado de ALTA', 'success');
        console.log('No tenía Alta, ahora si está dado de ALTA');
        this.signal.renderizarMensajes.set( 'Enviados' );
        this.signal.setMensajeriaDataAsignacionDefault();
      }, error: ( error ) => {
        this.alert.showAlert('Ocurrió un error al dar de alta al decano:' + error, 'error');
      }
    })
  }

}
