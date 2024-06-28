import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, effect } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AsignacionRepository } from '../../domain/repositories/asignacion.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { Facultad } from '../../domain/models/facultad.model';
import { Local } from '../../domain/models/local.model';
import { ProgramaFacultad } from '../../domain/models/programa.model';
import { SemestreAcademico } from '../../domain/models/semestre-academico.model';
import { SemestreAcademicoDomainService } from '../../domain/services/semestre-academico-domain.service';
import { DecanoSignal } from '../../domain/signals/decano.signal';
import { DirectorSignal } from '../../domain/signals/director.signal';
import { FacultadSignal } from '../../domain/signals/facultad.signal';
import { LocalSignal } from '../../domain/signals/local.signal';
import { ProgramaSignal } from '../../domain/signals/programa.signal';
import { SemestreSignal } from '../../domain/signals/semestre.signal';
import { SemestreAcademicoPageComponent } from '../semestre-academico-page/semestre-academico-page.component';
import { DecanoPageComponent } from '../decano-page/decano-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { FacultadListComponent } from '../facultades-page/facultad-list/facultad-list.component';
import { FacultadPageComponent } from '../facultades-page/facultad-page.component';
import { LocalPageComponent } from '../local-page/local-page.component';
import { ProgramaAcademicoPageComponent } from '../programa-academico-page/programa-page.component';
import { SemestreListComponent } from '../semestre-academico-page/semestre-list/semestre-list.component';
import { AsignacionSignal } from '../../domain/signals/asignacion.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { Asignacion, AsignacionEliminar, AsignacionLocal, AsignacionPrograma, AsignarNuevoPrograma } from '../../domain/models/asignacion.model';
import { LocalListComponent } from '../local-page/local-list/local-list.component';
import { ThisReceiver } from '@angular/compiler';
import { ProgramasAcademicosComponent } from '../programas-academicos-page.component';

@Component({
  selector: 'asignacion-page',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    SemestreAcademicoPageComponent,
    FacultadPageComponent,
    SemestreListComponent,
    FacultadListComponent,
    ProgramaAcademicoPageComponent,
    LocalPageComponent,
    DecanoPageComponent,
    DirectorPageComponent,
    AsignacionPageComponent,
    LocalListComponent,
    UiButtonComponent,
    ProgramasAcademicosComponent,
  ],
  templateUrl: './asignacion-page.component.html',
  styleUrl: './asignacion-page.component.scss'
})
export class AsignacionPageComponent implements OnInit {


    semestresAcademicos = this.semestreAcademicoDomainService.semestresAcademicos;
    semestreAcademicoAperturado = this.semestreAcademicoDomainService.semestreAcademicoAperturado;
    existeSemestreCreado: boolean;

    asignaciones = this.asignacionSignal.asignaciones;

    semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
    facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
    programaSelect: WritableSignal<ProgramaFacultad> = this.programaSignal.programaSelect;
    decanoSelect: WritableSignal<UsuarioRol> = this.decanoSignal.decanoSelect;
    directorSelect: WritableSignal<UsuarioRol> = this. directorSignal.directorSelect;
    localSelect: WritableSignal<Local> = this.localSignal.localSelect;
    localesSelect: WritableSignal<Local[]> = this.localSignal.localesSelect;
    // decanoSelect: 
    constructor( 
        
        private dialog: MatDialog,
        private semestreAcademicoDomainService: SemestreAcademicoDomainService,
        private programaSignal: ProgramaSignal,
        private semestreSignal: SemestreSignal,
        private facultadSignal: FacultadSignal,
        private decanoSignal: DecanoSignal,
        private directorSignal: DirectorSignal,
        private localSignal: LocalSignal,
        private asignacionSignal: AsignacionSignal,
        private asignacionRepository: AsignacionRepository,
        private alertService: AlertService,
        
    ) {
      // effect(() => {
      //   console.log(`New semestre selected: ${this.semestreSelect()}`);
      //   this.obtener( this.semestreSelect().id );
      // });
    }

  ngOnInit(): void {
    // this.obtener( this.semestreSelect().id );
  }

  obtener = ( idSemestre: number ) => {
    this.asignacionRepository.obtener( idSemestre ).subscribe({
      next: ( programasAsignados ) => {
        console.log(programasAsignados);
        this.localSignal.setSelectLocales( [] );
        this.facultadSignal.setIdFacultad( 0 );
        // const facultad = {
        //   id: programasAsignados[0].idFacultad,
        //   definicion: '',
        //   nombre: programasAsignados[0].nombreFacultad,
        //   usuarioId: 0
        // }

        // const 
        this.asignacionSignal.setAsignaciones( programasAsignados );
      }, error: (error) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error', 'error');
      }
    })
  }


  openModalDecanos = () => {

  }


  openModalFacultad = () => {

  }

  openModalPrograma = () => {
    
  }

  openModalDirector = () => {

  }

  abrirUbicacionLocal = () => {

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
        usuarioId: 1
      }
      this.agregarPrograma( newPrograma );
    })
  }

  agregarLocalAlProgramaConfirm = ( asignacion: Asignacion, programa: AsignacionPrograma ) => {

    // this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea AG el programa?')
    //   .then( isConfirm => {
    //     if( !isConfirm ) return;
        // this.agregarLocalesAlPrograma( asignacion, programa );
      // });

  }


  agregarProgramaConfirm = ( asignacion: Asignacion ) => {
    if ( 
      !(this.programaSelect().id != 0 &&
      this.directorSelect().id != 0 && 
      this.localesSelect().length > 0)
  ) {
      this.alertService.showAlert('Verifique que exista DECANO, DIRECTOR DE ESCUELA Y LOCALES', 'info')
      return} 
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea GUARDAR el programa?')
      .then( isConfirm => {
        if( !isConfirm ) return;

        const locales = this.localesSelect().map( local => local.id );

        const newPrograma: AsignarNuevoPrograma = {
          idDecano: asignacion.idDecano,
          idDirector: this.directorSelect().id,
          idLocales: locales,
          idPrograma: this.programaSelect().id,
          idSemestre: this.semestreSelect().id,
          usuarioId: 1
        }
        // console.log(newPrograma);
        this.agregarPrograma( newPrograma );



      });
  }

  agregarPrograma = ( asignacion: AsignarNuevoPrograma ) => {

    this.asignacionRepository.insertar( asignacion ).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.sweetAlert('success', 'Correcto', 'Programas agregados correctamente');
        this.programaSignal.setSelectProgramaDefault();
        this.localSignal.setSelectLocalesDefault();
        this.directorSignal.setSelectDirectorDefault();

        this.obtener( this.semestreSelect().id );
      }, error: (error) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error', 'error');

      }
    });
  }

  eliminarProgramaConfirm = ( asignacion: Asignacion, programa: AsignacionPrograma) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea ELIMINAR el programa?')
      .then( isConfirm => {
        if( !isConfirm ) return;
        this.eliminarPrograma( asignacion, programa );
    });
  }

  eliminarProgramaIndividualConfirm = ( asignacion: Asignacion, programa: AsignacionPrograma, idLocal: number ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea ELIMINAR el programa?')
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
      usuarioId: 1
    }
    console.log(eliminarPrograma);
    
    this.asignacionRepository.eliminar( eliminarPrograma ).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.sweetAlert('success', 'Correcto', 'Se eliminó correctamente');
        this.programaSignal.setSelectProgramaDefault();
        this.localSignal.setSelectLocalesDefault();
        this.directorSignal.setSelectDirectorDefault();
        this.obtener( this.semestreSelect().id );
      }, error: (error) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error', 'error');

      }
    })
    
  }

}
