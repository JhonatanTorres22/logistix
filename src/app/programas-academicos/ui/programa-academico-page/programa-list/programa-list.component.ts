import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, WritableSignal } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ProgramaAcademicoAddComponent } from '../programa-add/programa-add.component';
import { Programa, ProgramaEliminar, ProgramaFacultad } from 'src/app/programas-academicos/domain/models/programa.model';
import { ProgramaRepository } from 'src/app/programas-academicos/domain/repositories/programa.repository';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FacultadSignal } from 'src/app/programas-academicos/domain/signals/facultad.signal';
import { Facultad } from 'src/app/programas-academicos/domain/models/facultad.model';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { reject } from 'lodash';
import { FacultadRepository } from 'src/app/programas-academicos/domain/repositories/facultad.repository';

@Component({
  selector: 'programa-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, ProgramaAcademicoAddComponent, UiInputComponent, UiButtonComponent ],
  templateUrl: './programa-list.component.html',
  styleUrl: './programa-list.component.scss'
})
export class ProgramaAcademicoListComponent {


  showFormAgregarPrograma: boolean = false;
  programaEdit: ProgramaFacultad;
  programas: WritableSignal<ProgramaFacultad[]>= this.programaSignal.programasList;
  facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
  idFacultad: WritableSignal<number> = this.facultadSignal.idFacultad;
  // programaes: 
  programaSelect: ProgramaFacultad = {
    id: 0,
    // idFacultad: 0,
    definicion: '',
    nombre: '',
    usuarioId: 0
};

  constructor(
    private programaRepository: ProgramaRepository,
    private programaSignal: ProgramaSignal,
    private facultadSignal: FacultadSignal,
    private alertService: AlertService,
    private asignacionSignal: AsignacionSignal,
    public dialogRef: MatDialogRef<ProgramaAcademicoListComponent>,
    private facultadRepository: FacultadRepository
  ) {

  }
  ngOnInit(): void {
    // this.facultadSelect().id == 0 ? this.asi
    this.obtenerProgramas()
  }

  openShowFormCrearPrograma = ( event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Programa Creado');
          this.programaEdit = {
            id: 0,
            // idFacultad: 0,
            definicion: '',
            nombre: '',
            usuarioId: 0
          };
          this.showFormAgregarPrograma = false;
         this.obtenerProgramas();
        } break;

        case 'Edit': {
          console.log('Programa Editado');
          this.programaEdit = {
            id: 0,
            // idFacultad: 0,
            definicion: '',
            nombre: '',
            usuarioId: 0
          };
          this.showFormAgregarPrograma = false;
          this.obtenerProgramas();
        } break;

        case 'Open': {
          this.showFormAgregarPrograma = true;
          this.programaEdit = {
            id: 0,
            // idFacultad: 0,
            definicion: '',
            nombre: '',
            usuarioId: 0
          };
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.programaEdit = {
            id: 0,
            // idFacultad: 0,
            definicion: '',
            nombre: '',
            usuarioId: 0
          };
          this.showFormAgregarPrograma = false;
        }
      }
  }

  obtenerProgramas = () => {
    // console.log(this.idFacultad());
    // console.log(this.facultadSelect().id);

    this.facultadSelectVerificar().then( suscess => {
      this.programaRepository.obtenerProgramas( this.facultadSelect().id ).subscribe({
        next: ( programas ) => {
          console.log(programas);
          this.programaSignal.setProgramaesList( programas );
          
        }, error: ( error ) => {
          console.log(error);
          
        }
      });
    })
  }

  facultadSelectVerificar() {

    return new Promise<boolean>( ( resolve, reject ) => {

      const isFacultadAsignada = this.idFacultad() && this.idFacultad() != 0;
      console.log(this.idFacultad());
      console.log(isFacultadAsignada);
      
      if ( !isFacultadAsignada ) {
        console.log('No es asignada');
        
        resolve( true )
        return
      }
      console.log('Si es asignada');

      this.obtenerFacultades().then( isSuccss => {
        if( !isSuccss ) return

        console.log(this.facultadSignal.facultadesList());
      
        const facultadSelectReconstruida = this.facultadSignal.facultadesList().filter( facultad => facultad.id == this.idFacultad() );
        this.facultadSignal.setSelectFacultad( facultadSelectReconstruida[0] );
        resolve( true );

      })
    })

  }

  obtenerFacultades = () => {

    return new Promise<boolean>( resolve => {

      this.facultadRepository.obtenerFacultades().subscribe({
        next: ( facultades ) => {
          console.log(facultades);
          this.facultadSignal.setFacultadesList( facultades );
          resolve( true )

        }, error: ( error ) => {

          console.log(error);
          resolve( false )
        }
      });

    });

  }
  
  openShowFormEditarPrograma = ( programa: ProgramaFacultad, event?: EventEmitter<string> | string) => {

    console.log(event);
    
      switch( event ) {
        case 'Add': {
          console.log('Semestre Creado');
          this.showFormAgregarPrograma = false;
         this.obtenerProgramas();
        } break;

        case 'Edit': {
          console.log('Semestre Editado');
          this.showFormAgregarPrograma = false;
          this.obtenerProgramas();
        } break;

        case 'Open': {
          this.showFormAgregarPrograma = true;
          this.programaEdit = programa;
          this.programaSignal.setProgramaEdit( programa );
          // this.pathValueFormSemestreEdit();
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.showFormAgregarPrograma = false;
        }
      }
  }


  eliminarProgramaConfirm = ( programa: ProgramaFacultad ) => {
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea eliminar el programa académico?').then( isConfirm => {
      if( !isConfirm ) return;

      this.eliminarPrograma( programa );
    });
    
  }


  eliminarPrograma = ( programa: ProgramaEliminar ) => {
    const programaEliminar = {
      id: programa.id,
      usuarioId: 1
    }

    this.programaRepository.eliminarPrograma( programaEliminar ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alertService.sweetAlert('success', '¡CORRECTO!', 'Programa académico eliminado correctamente');
        this.programaSelect = {
          id: 0,
          definicion: '',
          nombre: '',
          usuarioId: 0
        };
        this.obtenerProgramas();
      }, error: ( error ) => {
        console.log( error );
        this.alertService.showAlert(`Ocurrio un error. ${ error }`, 'error')
      }
    });
  }

  onSelect = () => {

    if( this.programaSelect.id == 0 ) return;

    this.alertService.sweetAlert('question', 'Confirmación', `Está seguro que desea SELECCIONAR el programa academico`)
    .then( isConfirm => {
      if( !isConfirm ) return;
      this.programaSignal.setSelectPrograma(  this.programaSelect );
      this.dialogRef.close('seleccionado');
      // this.aperturarSemestre();
    
    })
  }

}
