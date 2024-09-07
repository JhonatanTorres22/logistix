import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, signal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MensajeriaNoMessagesComponent } from '../mensajeria-no-messages/mensajeria-no-messages.component';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { MensajeriaComposeComponent } from '../mensajeria-compose/mensajeria-compose.component';
import { MensajeriaResponseComponent } from '../mensajeria-response/mensajeria-response.component';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { MensajeriaCerrarArchivar, MensajeriaHistorialMensajes, MensajeriaRecibidos, MensajeriaResponderAList } from '../../domain/models/mensajeria.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { ProgramaCardComponent } from 'src/app/programas-academicos/ui/programa-academico-page/programa-card/programa-card.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { MensajeriaFlujoNavegacionComponent } from '../mensajeria-flujo-navegacion/mensajeria-flujo-navegacion.component';
import { MensajeriaAsuntoComponent } from '../mensajeria-asunto/mensajeria-asunto.component';
import { MensajeriaCardArchivedClosedApprovedComponent } from '../mensajeria-card-archived-closed-approved/mensajeria-card-archived-closed-approved.component';
import { environment } from 'src/environments/environment';
import { MensajeriaEstadoComponent } from '../mensajeria-estado/mensajeria-estado.component';

@Component({
  selector: 'mensajeria-messages',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule,
    MensajeriaNoMessagesComponent,
    MensajeriaComposeComponent,
    MensajeriaResponseComponent,
    UiButtonComponent,
    ProgramaCardComponent,
    MensajeriaFlujoNavegacionComponent,
    MensajeriaAsuntoComponent,
    MensajeriaEstadoComponent,
    MensajeriaCardArchivedClosedApprovedComponent
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
export class MensajeriaMessagesComponent implements OnInit {

  @Input() star = false;
  @Input() unStar = true;
  @Output() backToMail: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('scrolling') scrolling: ElementRef;
  
  showFormResponse = this.mensajeriaSignal.showFormResponse;
  readonly panelOpenState = signal(false);
  btnAvanzar: string = '';
  btnRetroceder: string = '';
  btnCerrarYarchivar: string = '';
  btnForzarCierre: string = '';

  mensajesHistorial = this.mensajeriaSignal.mensajesHistorial;
  tipoBandeja = this.mensajeriaSignal.tipoBandeja;
  listaDestinatariosResponderA = this.mensajeriaSignal.listaDestinatariosResponderA;
  listaDestinatariosResponderAflujo = this.mensajeriaSignal.listaDestinatariosResponderAflujo;
  selectMensaje = this.mensajeriaSignal.selectMensaje;
  currentRol = this.authSignal.currentRol;
  esConforme: boolean = false;
  // mensajeHistorialSelect: MensajeriaHistorialMensajes;
  constructor(
    private mensajeriaSignal: MensajeriaSignal,
    private userRolRepository: UsuarioRolRepository,
    private repository: MensajeriaRepository,
    private alert: AlertService,
    private semestreSignal: SemestreSignal,
    private modal: UiModalService,
    private authSignal: AuthSignal
  ) {}
  ngOnInit(): void {
    this.obtenerDestinatariosReponderA(this.mensajesHistorial()[ this.mensajesHistorial().length - 1].idMensaje );
    // console.log(this.mensajesHistorial()[ this.mensajesHistorial().length - 1].idMensaje);
    setTimeout(() => {
      this.scrollToBottom();
    }, 2000);
  }

  onObservacion() {

  }




  


  



  // onBackToMail = () => {
  //   this.backToMail.emit( true );
  // }

  obtenerDestinatariosReponderA( idMensaje: number ) {
    this.repository.responderMensajeA( idMensaje ).subscribe({
      next: ( destinatarioResponderA ) => {
        // console.log( destinatarioResponderA );
        const filterRolUnique = destinatarioResponderA.reduce( (destinatarios: MensajeriaResponderAList[], data: MensajeriaResponderAList) => {

          const existe = destinatarios.findIndex( dest => dest.idUsuarioRol == data.idUsuarioRol );
          if( existe != -1 ) {
            destinatarios[existe] = data;
            destinatarios = destinatarios.filter( dest => dest.idUsuarioRol !== data.idUsuarioRol )
            // console.log( destinatarios[existe] );
            // console.log( data );
            // console.log( existe );
            
            
            
          }

          destinatarios.push( data );

          return destinatarios

        }, []);

        // console.log(filterRolUnique);
        

        this.listaDestinatariosResponderA.set( filterRolUnique );

      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los destnatarios: ' + error, 'error', 6);

      }
    })
  }

   



  scrollToBottom(): void {
    try {
        this.scrolling.nativeElement.scrollTop = this.scrolling.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  descargarArchivo = ( mensaje: MensajeriaHistorialMensajes) => {
    window.open(`${environment.EndPoint}Archivos/${mensaje.archivo}`, "_blank")
  }

}
