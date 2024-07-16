import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AsignacionPrograma, Asignacion } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { MensajeriaHistorialMensajes } from '../../domain/models/mensajeria.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { AsignacionRepository } from 'src/app/programas-academicos/domain/repositories/asignacion.repository';
import { ProgramaCardComponent } from 'src/app/programas-academicos/ui/programa-academico-page/programa-card/programa-card.component';

@Component({
  selector: 'mensajeria-asunto',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent, ProgramaCardComponent ],
  templateUrl: './mensajeria-asunto.component.html',
  styleUrl: './mensajeria-asunto.component.scss'
})
export class MensajeriaAsuntoComponent {

  modoTablet = this.signal.mensajeriaModoTablet;
  mensajesHistorial = this.signal.mensajesHistorial;
  backToMail = this.signal.backToMail;

  mensajeHistorialSelect: MensajeriaHistorialMensajes;
  showButtons: boolean = false;
  programaForAlta: Asignacion;


  semestresAcademicos = this.semestreSignal.semestresAcademicos;
  semestreSelect = this.semestreSignal.semestreSelect;


  constructor(
    private signal: MensajeriaSignal,
    private alert: AlertService,
    private modal: UiModalService,
    private semestreSignal: SemestreSignal,
    private repositoryAsignacion: AsignacionRepository,

  ) {}

  onBackToMail = () => {
    this.backToMail.set( this.signal.backToMailDefault );
  }

  showCardPrograma = ( template: TemplateRef<any>, mensaje: MensajeriaHistorialMensajes, showButtons: boolean ) => {
    this.obtenerProgramaForAlta()
      .then( programaForAlta => {
        console.log(programaForAlta);
        this.mensajeHistorialSelect = mensaje;
        this.showButtons = showButtons
        if( programaForAlta == '' ) {
          // console.log('No hay programa encontrado');
          this.alert.showAlert(`No se encontró el programa`, 'error', 6);
          throw('No hay programa encontrado');
        }

        console.log( programaForAlta );
        this.programaForAlta = programaForAlta;
       
    
          this.modal.openTemplate( {
            template,
            titulo: 'Programa Académico'
          } )
  

      } )
  }

  getSemestre = ( codigo: string ) => {
    const semestre = this.semestresAcademicos().find( semestre => semestre.codigo == codigo );

    return semestre ? semestre : this.semestreSelect();
  }

  obtenerProgramaForAlta() {
    let programaAsignado: AsignacionPrograma[];
    const asunto = this.mensajesHistorial()[0].asunto;
    let nombrePrograma = '';
    switch( (asunto ).substring(0, 3) ) {
      
      case 'DAR': { 
        nombrePrograma = asunto.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', '');

       }; break;
      case 'VAL': { 
        nombrePrograma = asunto.replace('VALIDAR PLAN DE ESTUDIOS DE LA ESCUELA DE ', '');

       }; break;
      case 'CAM': { 
        nombrePrograma = asunto.replace('CAMBIAR EL PLAN DE ESTUDIOS DE ', '');

       }; break;
    }
    // let nombrePrograma = asunto.replace('DAR DE ALTA A DIRECTOR DE ESCUELA DE ', '');
    const semestreCodigo = asunto.substring( asunto.length - 6)

    const semestre = this.getSemestre( semestreCodigo );
    
    nombrePrograma = nombrePrograma.substring(0, nombrePrograma.length - 7);


    return new Promise<Asignacion | ''>( resolve => {
      
      this.repositoryAsignacion.obtener( semestre.id ).subscribe({
        next: ( programasAsignados ) => {


          const asignacionFacultad = programasAsignados.filter( asignacionItem => {
            const asignacionPrograma = asignacionItem.programas.filter( programaItem => programaItem.nombrePrograma == nombrePrograma );
            
            if( asignacionPrograma.length > 0 ) {
              programaAsignado = asignacionPrograma
              return asignacionPrograma
            }
            return
          });

          if( asignacionFacultad.length == 0 ) {
            resolve('');
            
          }
          const data: Asignacion = {
            ...asignacionFacultad[0],
            programas: programaAsignado ? programaAsignado : []
          }
          
          resolve( data );
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al listar las programasAsignados: ' + error, 'error', 6);
          resolve( '' );
        }
      });
    })

  }

}
