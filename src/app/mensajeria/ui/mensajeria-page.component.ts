import { CommonModule } from '@angular/common';
import { Component, ViewChild, effect, signal } from '@angular/core';
import { EmailComponent } from 'src/app/demo/pages/application/email/email.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaNavComponent } from './mensajeria-nav/mensajeria-nav.component';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MAX_WIDTH_1024PX, MAX_WIDTH_1399PX, MAX_WIDTH_767PX, MIN_WIDTH_1025PX, MIN_WIDTH_1400PX, MIN_WIDTH_768PX } from 'src/app/@theme/const';
import { MatDialog } from '@angular/material/dialog';
import { MensajeriaContentComponent } from './mensajeria-content/mensajeria-content.component';
import { MensajeriaSignal } from '../domain/signals/mensajeria.signal';
import { MensajeriaRepository } from '../domain/repositories/mensajeria.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { Subject, takeUntil } from 'rxjs';
import { UiButtonSplitComponent } from 'src/app/core/components/ui-button-split/ui-button-split.component';

@Component({
  selector: 'app-mensajeria-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, MensajeriaContentComponent, UiButtonSplitComponent],
  templateUrl: './mensajeria-page.component.html',
  styleUrl: './mensajeria-page.component.scss'
})
export class MensajeriaPageComponent {

  // public props
  @ViewChild('email') email: MatDrawer;
  modeValue: MatDrawerMode = 'side';
  modoTablet = this.signal.mensajeriaModoTablet
  status = 'false';
  selectedTabIndex = 0;
  mailListHight = true;

  mensajesRecibidosTotal = this.signal.mensajesRecibidosTotal;
  mensajesEnviadosTotal = this.signal.mensajesEnviadosTotal;
  mensajesArchivadosTotal = this.signal.mensajesArchivadosTotal;
  showFormNuevoMensaje = this.signal.showFormNuevoMensaje;

  // constructor
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private signal: MensajeriaSignal,
    private repository: MensajeriaRepository,
    private alert: AlertService,
  ) {

    /* BREAKING POINTS ANGULAR */
    // breakpointObserver
    //   .observe([
    //     Breakpoints.XSmall,
    //     Breakpoints.Small,
    //     Breakpoints.Medium,
    //     Breakpoints.Large,
    //     Breakpoints.XLarge,
    //   ])
    //   .pipe(takeUntil(this.destroyed))
    //   .subscribe(result => {
    //     for (const query of Object.keys(result.breakpoints)) {
    //       if (result.breakpoints[query]) {
    //         this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
    //       }
    //     }
    //   });
    /* BREAKING POINTS ANGULAR */

    effect( () => {
      console.log( this.signal.renderizarMensajes() );
      switch( this.signal.renderizarMensajes() ) {
        case 'Enviados': {
          this.showFormNuevoMensaje.set( false );
          this.obtenerMensajesEnviados();
        this.signal.setMensajesHistorialDefault();

        this.signal.renderizarMensajes.set('');


        }; break;

        case 'Respuesta': {
          this.obtenerMensajesRecibidos();
          setTimeout(() => {
            this.obtenerMensajesEnviados();
            this.signal.setMensajesHistorialDefault();
            this.signal.renderizarMensajes.set('');

          }, 800);

        } break;

        case 'Alta': {
          this.obtenerMensajesRecibidos();
          this.obtenerMensajesEnviados();
          this.obtenerMensajesArchivados();
          this.signal.setMensajesHistorialDefault();
          this.signal.renderizarMensajes.set('');

        }
      }
    }, { allowSignalWrites: true})
  }

  // life cycle event
  ngOnInit() {

    if( this.signal.mensajeriaInsertarDataAsignacion().asignacion?.idDecano == 0  ) {
      this.signal.setMensajeriaDataAsignacionDefault();
      this.signal.setMensajesHistorialDefault();
    }

    this.obtenerMensajesRecibidos();
    this.obtenerMensajesEnviados();
    this.obtenerMensajesArchivados();
    
    this.breakpointObserver.observe([MIN_WIDTH_1025PX, MAX_WIDTH_1024PX]).subscribe((result) => {
      if (result.breakpoints[MAX_WIDTH_1024PX]) {
        this.modeValue = 'over';
      } else if (result.breakpoints[MIN_WIDTH_1025PX]) {
        this.modeValue = 'side';
      }
    });
    this.breakpointObserver.observe([MIN_WIDTH_1400PX, MAX_WIDTH_1399PX]).subscribe((result) => {
      if (result.breakpoints[MAX_WIDTH_1399PX]) {
        this.status = 'true'; //false
      } else if (result.breakpoints[MIN_WIDTH_1400PX]) {
        this.status = 'true';
      }
    });
    this.breakpointObserver.observe([MIN_WIDTH_768PX, MAX_WIDTH_767PX]).subscribe((result) => {
      if (result.breakpoints[MAX_WIDTH_767PX]) {
        this.modoTablet.set( true );
        // this.signal.setSeleccionarMensajeDefault();
        // this.signal.setMensajesHistorialDefault();


      } else if (result.breakpoints[MIN_WIDTH_768PX]) {
        this.modoTablet.set( false );
      //   this.signal.setSeleccionarMensajeDefault();
      // this.signal.setMensajesHistorialDefault();

      }
    });


  }

  tabChanged(index: number) {
    this.selectedTabIndex = index;
    console.log(index);
    
  }

  onClick() {
    this.mailListHight = !this.mailListHight;
  }

  nuevoMensaje = ( ) => {
    // this.repository.nuevoMensajeA()
    this.showFormNuevoMensaje.set( true );
  }

  composeMail() {

  }

  toggle() {
    this.signal.setToggle();
  }



  obtenerMensajesRecibidos = () => {
    this.repository.obtenerMensajesRecibidos().subscribe({
      next: ( mensajesRecibidos ) => {
        this.signal.setMensajesRecibidos( mensajesRecibidos );
        this.alert.showAlert('Listando mensajes...', 'success')
      }, error: ( error ) => {
        console.log(error);
        this.alert.showAlert('Ocurrio un error al obtener los mensajes: ' + error, 'error')
      }
    });
  }

  obtenerMensajesEnviados = () => {
    this.repository.obtenerMensajesEnviados().subscribe({
      next: ( mensajesEnviados ) => {
        this.signal.setMensajesEnviados( mensajesEnviados );
        console.log(mensajesEnviados);
        
      }, error: ( error ) => {
        console.log(error);
        this.alert.showAlert('Ocurrio un error al obtener los mensajes: ' + error, 'error')
      }
    })
  }

  obtenerMensajesArchivados = () => {
    this.repository.obtenerMensajesArchivados().subscribe({
      next: ( mensajesArchivados ) => {
        this.signal.setMensajesArchivados( mensajesArchivados );
        console.log(mensajesArchivados);
        
      }, error: ( error ) => {
        console.log(error);
        this.alert.showAlert('Ocurrio un error al obtener los mensajes: ' + error, 'error')
      }
    });
  }


  // destroyed = new Subject<void>();
  // currentScreenSize: string;

  // displayNameMap = new Map([
  //   [Breakpoints.XSmall, 'XSmall'],
  //   [Breakpoints.Small, 'Small'],
  //   [Breakpoints.Medium, 'Medium'],
  //   [Breakpoints.Large, 'Large'],
  //   [Breakpoints.XLarge, 'XLarge'],
  // ]);



  // ngOnDestroy() {
  //   this.destroyed.next();
  //   this.destroyed.complete();
  // }

}
