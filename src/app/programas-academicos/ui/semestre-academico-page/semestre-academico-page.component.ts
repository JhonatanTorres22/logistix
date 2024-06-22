import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input, WritableSignal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ModalComponent } from '../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SemestreAddComponent } from './semestre-add/semestre-add.component';
import { SemestreAcademico, SemestreAcademicoEliminar } from '../../domain/models/semestre-academico.model';
import { SemestreAcademicoDomainService } from '../../domain/services/semestre-academico-domain.service';
import { SemestreAcademicoRepository } from '../../domain/repositories/semestre-academico.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SemestreListComponent } from './semestre-list/semestre-list.component';
import { SemestreSignal } from '../../domain/signals/semestre.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';

@Component({
  selector: 'semestre-academico-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent],
  templateUrl: './semestre-academico-page.component.html',
  styleUrl: './semestre-academico-page.component.scss'
})
export class SemestreAcademicoPageComponent {

  semestresAcademicos = this.semestreAcademicoDomainService.semestresAcademicos;
  semestreAcademicoAperturado = this.semestreAcademicoDomainService.semestreAcademicoAperturado;
  existeSemestreCreado: boolean;

  semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;

  constructor(
    private semestreAcademicoRepository: SemestreAcademicoRepository,
    private dialog: MatDialog,
    private semestreAcademicoDomainService: SemestreAcademicoDomainService,
    private semestreSignal: SemestreSignal,
    private alertService: AlertService
  ) {
      const semestre = JSON.parse(localStorage.getItem('currentSemestre')!);
      // console.log(semestre);
      semestre ? this.semestreSignal.setSelectSemestre( semestre ) : ''
    // this.existeSemestreCreado = this.semestreAcademico ? true : false;
  }

  ngOnInit(): void {
    this.obtenerSemestres();
  }

  obtenerSemestres = () => {
    this.semestreAcademicoRepository.obtenerSemestres().subscribe({
      next: ( semestres ) => {
          // console.log(semestres);
          this.existeSemestreCreado = semestres.length > 0;
          if( semestres.length == 0 ) {
            this.semestreAcademicoDomainService.setSemestreAcademicoDefault();
            return;
          }

          semestres.forEach( semestre => {
            // console.log(semestre);
            if( semestre.condicion == 'APERTURADO') {
              this.semestreAcademicoDomainService.setSemestreAcademicoAperturado( semestre );
            }
            
          })
          this.semestreAcademicoDomainService.setSemestresAcademicos(semestres);
      }, error: ( error ) => {
          console.log(error);
          
      }
  })
  }

  openModalSemestre = () => {
    console.log('abrir modal semestre list');
    const dialogRef = this.dialog.open( SemestreListComponent, {
      width: '800px',
      height: '460px',
      disableClose: true,
    } );

    dialogRef.afterClosed().subscribe( data => {
      if( data == 'cancelar' ) return;

      this.obtenerSemestres();
    })
  }

  openModalCreaSemestre = () => {
    console.log('abrir modal semestre add');
    const dialogRef = this.dialog.open( SemestreAddComponent, {
      width: '600px',
      height: '360px',
      disableClose: true,
    } );

    dialogRef.afterClosed().subscribe( semestreCreado => {
      console.log(semestreCreado);

      if( semestreCreado == 'cancelar' ) return
      
        console.log(semestreCreado);
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
      
        console.log(semestreEditado);
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
      usuarioId: 1
    }

    this.semestreAcademicoRepository.eliminarSemestre( semestreEliminar ).subscribe({
      next: ( data ) => {
        console.log( data );
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
  //     usuarioId: 1
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
