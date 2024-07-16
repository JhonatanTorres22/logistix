import { CommonModule } from '@angular/common';
import { Component, Input, WritableSignal } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaDataAsignacion } from 'src/app/mensajeria/domain/models/mensajeria.model';
import { Asignacion, AsignacionEliminar, AsignacionPrograma, AsignarNuevoPrograma } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { SemestreAcademico } from 'src/app/programas-academicos/domain/models/semestre-academico.model';
import { AsignacionRepository } from 'src/app/programas-academicos/domain/repositories/asignacion.repository';
import { DirectorSignal } from 'src/app/programas-academicos/domain/signals/director.signal';
import { LocalSignal } from 'src/app/programas-academicos/domain/signals/local.signal';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { LocalListComponent } from '../../local-page/local-list/local-list.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { MatDialog } from '@angular/material/dialog';
import { Local } from 'src/app/programas-academicos/domain/models/local.model';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';


@Component({
  selector: 'programa-card',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent],
  templateUrl: './programa-card.component.html',
  styleUrl: './programa-card.component.scss'
})
export class ProgramaCardComponent {

  @Input() programa: AsignacionPrograma;
  @Input() asignacion: Asignacion;


  semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
  localSelect: WritableSignal<Local> = this.localSignal.localSelect;
  localesSelect: WritableSignal<Local[]> = this.localSignal.localesSelect;
  renderizarAsignaciones = this.signal.renderizarAsignaciones;
  currentRol = this.auth.currentRol;

  constructor(
    private alert: AlertService,
    private semestreSignal: SemestreSignal,
    private asignacionRepository: AsignacionRepository,
    private programaSignal: ProgramaSignal,
    private localSignal: LocalSignal,
    private auth: AuthSignal,
    private directorSignal: DirectorSignal,
    private signal: AsignacionSignal,
    // private modal: UiModalService
    private dialog: MatDialog
  ) {}

  openModalDirector = () => {
    console.log('Abrir modal Director...');
    
  }

  openModalLocal = ( asignacion: Asignacion, programa: AsignacionPrograma ) => {
    console.log('abrir modal LOCAL list');
    const dialogRef = this.dialog.open( LocalListComponent, {
      width: '800px',
      height: '460px',
      disableClose: true,
      data: { programaConLocales: programa.locales } 
    } );

    dialogRef.afterClosed().subscribe( data => {
      if( data !== 'seleccionado' ) return;
      // console.log(data);
      // console.log(this.localesSelect());

      const locales = this.localesSelect().map( local => local.id );     
      const newPrograma: AsignarNuevoPrograma = {
        idDecano: asignacion.idDecano,
        idDirector: programa.idDirector,
        idLocales: locales,
        idPrograma: programa.idPrograma,
        idSemestre: this.semestreSelect().id,
        usuarioId: parseInt( this.auth.currentRol().id )
      }
      this.agregarPrograma( newPrograma );
    })
  }

  agregarPrograma = ( asignacion: AsignarNuevoPrograma ) => {

    this.asignacionRepository.insertar( asignacion ).subscribe({
      next: (data) => {
        console.log(data);
        this.alert.sweetAlert('success', 'Correcto', 'Programas agregados correctamente');
        this.programaSignal.setSelectProgramaDefault();
        this.localSignal.setSelectLocalesDefault();
        this.directorSignal.setSelectDirectorDefault();

        // this.obtener( this.semestreSelect().id );
        console.log('Nuevo local asignado...... renderizar asignaciones');
        
        this.renderizarAsignaciones.set('Obtener');
      }, error: (error) => {
        console.log(error);
        this.alert.showAlert('Ocurrió un error', 'error');

      }
    });
  }

  eliminarProgramaConfirm = ( asignacion: Asignacion, programa: AsignacionPrograma) => {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea ELIMINAR el programa?')
      .then( isConfirm => {
        if( !isConfirm ) return;
        this.eliminarPrograma( asignacion, programa );
    });
  }

  eliminarProgramaIndividualConfirm = ( asignacion: Asignacion, programa: AsignacionPrograma, idLocal: number ) => {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea ELIMINAR el programa?')
      .then( isConfirm => {
        if( !isConfirm ) return;
        this.eliminarPrograma( asignacion, programa, idLocal );
    });
  }


  eliminarPrograma = ( asignacion: Asignacion, programa: AsignacionPrograma, idLocal?:number ) => {
    console.log(asignacion);
    console.log(idLocal);
    
    const locales = idLocal ? [idLocal] : programa.locales.map( local => local.idLocal);
    const eliminarPrograma: AsignacionEliminar = {
      idDecano: asignacion.idDecano,
      idDirector: programa.idDirector,
      idLocales: locales,
      idPrograma: programa.idPrograma,
      idSemestre: this.semestreSelect().id,
      usuarioId: parseInt( this.auth.currentRol().id )
    }
    console.log(eliminarPrograma);
    
    this.asignacionRepository.eliminar( eliminarPrograma ).subscribe({
      next: (data) => {
        console.log(data);
        this.alert.sweetAlert('success', 'Correcto', 'Se eliminó correctamente');
        this.programaSignal.setSelectProgramaDefault();
        this.localSignal.setSelectLocalesDefault();
        this.directorSignal.setSelectDirectorDefault();

        console.warn('Local o Programa Eliminado..... renderizar asignaciones');
        
        this.renderizarAsignaciones.set('Obtener')
      }, error: (error) => {
        console.log(error);
        this.alert.showAlert('Ocurrió un error', 'error');

      }
    });
    
  }

  enviarMensaje = ( asignacion: Asignacion, programa: AsignacionPrograma ) => {

    const semestreData: SemestreAcademico = this.semestreSelect();
    const asignacionData: Asignacion = {
      ...asignacion,
      programas: [programa],
    }

    const mensajeriaDataAsignacion: MensajeriaDataAsignacion = {
      asignacion: asignacionData,
      semestre: semestreData,
      tipoMensaje: 'DAR ALTA A DIRECTOR DE ESCUELA'
    }

    localStorage.setItem('mensajeriaData', JSON.stringify(mensajeriaDataAsignacion));
    // this.mensajeriaSignal.setMensajeriaDataAsignacion( mensajeriaDataAsignacion );
    // this.router.navigate(['/mensajeria']);
  }

  abrirUbicacionLocal = () => {

  }
}
