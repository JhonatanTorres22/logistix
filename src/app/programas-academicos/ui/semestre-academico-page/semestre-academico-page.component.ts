import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { SemestreAcademico } from '../../domain/models/semestre-academico.model';
import { SemestreAcademicoRepository } from '../../domain/repositories/semestre-academico.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SemestreSignal } from '../../domain/signals/semestre.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';

import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SemestreListComponent } from './semestre-list/semestre-list.component';
import { SemestreAddComponent } from './semestre-add/semestre-add.component';

import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';


@Component({
  selector: 'semestre-academico-page',
  standalone: true,

  imports: [CommonModule, SharedModule, UiButtonComponent, SemestreListComponent, SemestreAddComponent, UiCardNotItemsComponent],

  templateUrl: './semestre-academico-page.component.html',
  styleUrl: './semestre-academico-page.component.scss'
})
export class SemestreAcademicoPageComponent {

  semestresAcademicos = this.semestreSignal.semestresAcademicos;
  semestreAcademicoAperturado = this.semestreSignal.semestreAcademicoAperturado;
  existeSemestreCreado: boolean;

  semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;

  constructor(
    private modal: UiModalService,
    private semestreAcademicoRepository: SemestreAcademicoRepository,
    private dialog: MatDialog,
    private semestreSignal: SemestreSignal,
    private auth: AuthSignal,
    private alertService: AlertService
  ) {
      const semestre = JSON.parse(localStorage.getItem('currentSemestre')!);
      semestre ? this.semestreSignal.setSelectSemestre( semestre ) : ''
    // this.existeSemestreCreado = this.semestreAcademico ? true : false;
  }

  ngOnInit(): void {
    this.obtenerSemestres();
  }

  obtenerSemestres = () => {
    
    this.semestreAcademicoRepository.obtenerSemestres().subscribe({
      next: ( semestres ) => {
          this.existeSemestreCreado = semestres.length > 0;
          if( semestres.length == 0 ) {
            this.semestreSignal.setSemestreAcademicoDefault();
            return;
          }

          semestres.forEach( semestre => {
            if( semestre.condicion == 'APERTURADO') {
              this.semestreSignal.setSemestreAcademicoAperturado( semestre );
            }
            
          })
          this.semestreSignal.setSemestresAcademicos(semestres);
      }, error: ( error ) => {
          console.log(error);
          
      }
  })
  }

  openModalSemestre = () => {
    const dialogRef = this.dialog.open( SemestreListComponent, {
      width: '800px',
      // height: '460px',
      disableClose: true,
    } );

    dialogRef.afterClosed().subscribe( data => {
      if( data == 'cancelar' ) return;

      this.obtenerSemestres();
    })
  }
  @ViewChild('template1', { static: true }) template1: TemplateRef<any>;
  openModalSemestre1 = () => {    
    let titleModal = 'Semestre Académico';

    this.modal.openTemplate({
      template: this.template1,
      titulo: titleModal
    }).afterClosed().subscribe( resp => {
      if(resp == 'cancelar'){
        return;
      }
    })
  }

  openModalCreaSemestre = () => {

    const dialogRef = this.dialog.open( SemestreAddComponent, {
      width: '600px',
      height: '360px',
      disableClose: true,
    } );

    dialogRef.afterClosed().subscribe( semestreCreado => {

      if( semestreCreado == 'cancelar' ) return
      
        this.obtenerSemestres();
      })
  }

  openModalEditarSemestre = ( semestre: SemestreAcademico) => {
    const dialogRef = this.dialog.open(SemestreAddComponent, {
        width: '600px',
        height: '360px',
        disableClose: true,
        data: semestre
    });

    dialogRef.afterClosed().subscribe( semestreEditado => {
      if( semestreEditado == 'cancelar' ) return
      
        this.obtenerSemestres();

    })

  }

  eliminarSemestreConfirm = ( semestre: SemestreAcademico ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea eliminar el semestre?').then( isConfirm => {
      if( !isConfirm ) return;

      this.eliminarSemestre( semestre );

    });
    
  }


  eliminarSemestre = ( semestre: SemestreAcademico ) => {
    const semestreEliminar = {
      id: semestre.id,
      usuarioId: parseInt( this.auth.currentRol().id )
    }

    this.semestreAcademicoRepository.eliminarSemestre( semestreEliminar ).subscribe({
      next: ( data ) => {
        this.alertService.showAlert('Semestre eliminado correctamente', 'success');
        this.obtenerSemestres();
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
      }
    });
  }

  cerrarSemestreConfirm = ( cerrarSemestre: SemestreAcademico ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea CERRAR el semestre?').then( isConfirm => {
      if( !isConfirm ) return;

      this.eliminarSemestre( cerrarSemestre );

    });
  }


  // cerrarSemestre = ( cerrarSemestre: SemestreAcademico ) => {
  //   const semestreCerrar = {
  //     id: cerrarSemestre.id,
  //     usuarioId: parseInt( this.auth.currentRol().id )
  //   }

  //   this.semestreAcademicoRepository.cerrarSemestre( semestreCerrar ).subscribe({
  //     next: ( data ) => {
  //       console.log( data );
  //       this.alertService.showAlert('Semestre CERRADO correctamente', 'success');
  //       this.obtenerSemestres();
  //     }, error: ( error ) => {
  //       console.log( error );
  //       this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
  //     }
  //   });
  // }

}
