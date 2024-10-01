import { CommonModule } from '@angular/common';
import { Component, EventEmitter, WritableSignal } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ProgramaAcademicoAddComponent } from '../programa-add/programa-add.component';
import { ProgramaEliminar, ProgramaFacultad } from 'src/app/programas-academicos/domain/models/programa.model';
import { ProgramaRepository } from 'src/app/programas-academicos/domain/repositories/programa.repository';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FacultadSignal } from 'src/app/programas-academicos/domain/signals/facultad.signal';
import { Facultad } from 'src/app/programas-academicos/domain/models/facultad.model';
import { AsignacionSignal } from 'src/app/programas-academicos/domain/signals/asignacion.signal';
import { FacultadRepository } from 'src/app/programas-academicos/domain/repositories/facultad.repository';
import { AsignacionPrograma } from 'src/app/programas-academicos/domain/models/asignacion.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';

@Component({
  selector: 'programa-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, ProgramaAcademicoAddComponent, UiInputComponent, UiButtonComponent ],
  templateUrl: './programa-list.component.html',
  styleUrl: './programa-list.component.scss'
})
export class ProgramaAcademicoListComponent {

  listaProgramasAsignadas: AsignacionPrograma[] = [];
  programaSeleccionado = this.programaSignal.programaSelect;
  showFormAgregarPrograma: boolean = false;
  programaEdit: ProgramaFacultad;
  programas: WritableSignal<ProgramaFacultad[]>= this.programaSignal.programasList;
  facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
  idFacultad: WritableSignal<number> = this.facultadSignal.idFacultad;
  asignaciones = this.asignacionSignal.asignaciones

  programaSelect: ProgramaFacultad = {
    id: 0,
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
    private auth: AuthSignal,
    public dialogRef: MatDialogRef<ProgramaAcademicoListComponent>,
    private facultadRepository: FacultadRepository
  ) {

  }
  ngOnInit(): void {
    // this.facultadSelect().id == 0 ? this.asi
    this.obtenerProgramas();
    this.programasAsignadas()
  }

  limpiarDatosProgramaAcademico = () => {
    this.programaEdit = {
      id: 0,
      // idFacultad: 0,
      definicion: '',
      nombre: '',
      usuarioId: 0
    }
  }
  openShowFormCrearPrograma = ( event?: EventEmitter<string> | string) => {
    
      switch( event ) {
        case 'Add': {
          this.limpiarDatosProgramaAcademico();
          this.showFormAgregarPrograma = false;
         this.obtenerProgramas();
        } break;

        case 'Edit': {       
            this.limpiarDatosProgramaAcademico();
            this.showFormAgregarPrograma = false;
            this.obtenerProgramas();
            this.programaSelect = this.programaEdit
        } break;

        case 'Open': {
          this.showFormAgregarPrograma = true;
          this.limpiarDatosProgramaAcademico();
        } break;

        case 'Cancelar': {
          this.limpiarDatosProgramaAcademico();
          this.showFormAgregarPrograma = false;
        }
      }
  }

  obtenerProgramas = () => {
    this.facultadSelectVerificar().then( suscess => {
      this.programaRepository.obtenerProgramas( this.facultadSelect().id ).subscribe({
        next: ( programas ) => {
          this.programaSignal.setProgramaesList( programas );
          

          if(this.programas().length > 0){
            let programaSeleccionada = this.programas().find(programa => programa.id === this.programaSeleccionado().id)
            if(programaSeleccionada){
              this.programaSelect = programaSeleccionada;
            }
          }
        }, error: ( error ) => {
          console.log(error);
          
        }
      });
    })
  }

  facultadSelectVerificar() {

    return new Promise<boolean>( ( resolve, reject ) => {

      const isFacultadAsignada = this.idFacultad() && this.idFacultad() != 0;
      
      if ( !isFacultadAsignada ) {
        resolve( true )
        return
      }

      this.obtenerFacultades().then( isSuccss => {
        if( !isSuccss ) return

      
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

      switch( event ) {
        case 'Add': {
          this.showFormAgregarPrograma = false;
         this.obtenerProgramas();
        } break;

        case 'Edit': {
          this.showFormAgregarPrograma = false;
          this.obtenerProgramas();
        } break;

        case 'Open': {
          this.showFormAgregarPrograma = true;
          this.programaEdit = programa;
          this.programaSignal.setProgramaEdit( programa );
        } break;

        case 'Cancelar': {
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
      usuarioId: parseInt( this.auth.currentRol().id )
    }

    this.programaRepository.eliminarPrograma( programaEliminar ).subscribe({
      next: ( data ) => {
        this.alertService.sweetAlert('success', '¡CORRECTO!', 'Programa académico eliminado correctamente');
        this.limpiarDatosProgramaAcademico();
        if(programa.id === this.programaSeleccionado().id){
          this.programaSignal.setSelectPrograma( this.programaSelect )
        }
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
    
    })
  }
 /* MOSTRAR LA LISTA DE PROGRAMAS YA ASIGNADAS PARA BLOQUEARLAS */
  programasAsignadas = () => {
    this.listaProgramasAsignadas = []
    this.asignaciones().forEach(facultad => {
      facultad.programas.forEach(programa => {
        this.listaProgramasAsignadas.push(programa)
      })
    })  
  }

  deshabilitarProgramaAsignado = ( programa:ProgramaFacultad): boolean => {
    this.limpiarDatosProgramaAcademico();
    return this.listaProgramasAsignadas.some(asignado => asignado.idPrograma === programa.id)
  }


}
