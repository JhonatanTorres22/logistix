import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, WritableSignal, effect } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoPageComponent } from '../../curso-page/curso-page.component';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { Ciclo, CicloEliminar } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { CicloAddComponent } from '../ciclo-add/ciclo-add.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';

@Component({
  selector: 'ciclo-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, CursoPageComponent, CicloAddComponent, UiButtonComponent],
  templateUrl: './ciclo-list.component.html',
  styleUrl: './ciclo-list.component.scss'
})
export class CicloListComponent implements OnInit {

  cicloList: WritableSignal<Ciclo[]> = this.signal.cicloList;
  showForm: boolean = false;
  cerrarFormCiclo = this.signal.cerrarFormCiclo;
  cicloEdit: Ciclo = {
    id: 0,
    cicloLetra: '',
    cicloNumero: '',
    definicion: ''
  };
  constructor(
    private repository: CicloRepository,
    private signal: CicloSingal,
    private alert: AlertService
  ) {
  }
  
  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
    this.repository.obtener().subscribe({
      next: ( ciclos ) => {
        this.signal.setCiclos( ciclos );
      }, error: ( error ) => {
        this.alert.showAlert('Ocurrió un error al listar los ciclos...', 'error');
        console.log(error);
        
      }
    })
  }

  onSubmit() {

  }

  // showFormCrearCiclo( tipo: string ) {
  //   this.signal.setShowForm(true);
  // }

  // showFormEditarCiclo( ciclo: Ciclo, tipo: string) {

  // }
  showFormCrearCiclo = ( event?: EventEmitter<string> | string) => {   
    
      switch( event ) {
        case 'Add': {
          
          console.log('Semestre Creado');
          this.cicloEdit = {
            id: 0,
            cicloLetra: '',
            cicloNumero: '',
            definicion: ''
          };
          this.showForm = false;
         this.obtener();
        } break;

        case 'Edit': {
          console.log('editar');
          
          console.log('Semestre Editado');
          this.cicloEdit = {
            id: 0,
            cicloLetra: '',
            cicloNumero: '',
            definicion: ''
          };
          this.showForm = false;
         this.obtener();
        } break;

        case 'Open': {
          console.log('open');
          
          this.showForm = true;
          this.cicloEdit = {
            id: 0,
            cicloLetra: '',
            cicloNumero: '',
            definicion: ''
          };
             
        } break;

        case 'Cancelar': {
          console.log('Cancelar');
          this.cicloEdit = {
            id: 0,
            cicloLetra: '',
            cicloNumero: '',
            definicion: ''
          };
          this.showForm = false;
        }
      }
  }

  showFormEditarCiclo = ( ciclo: Ciclo, event?: EventEmitter<string> | string) => {

      switch( event ) {

        case 'Open': {
          this.showForm = true;
          this.cicloEdit = ciclo;

        } break;

      }
  }

  eliminarConfirm( ciclo: Ciclo ) {
    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea eliminar el ciclo?').then( isConfirm => {
      if( !isConfirm ) return;
      const eliminarCiclo = {
        id: ciclo.id
      }
      this.eliminar( eliminarCiclo );

    });
  }

  eliminar( ciclo: CicloEliminar ) {
    this.repository.eliminar( ciclo ).subscribe({
      next: ( data ) => {
        this.alert.sweetAlert('success', 'Correcto', 'El ciclo se eliminó correctamente');
        this.obtener();
      }, error: ( error ) => {
        console.log(error);
        this.alert.sweetAlert('error', 'Error', 'Ocurrió un error al eliminar:' + error)
        
      }
    })
  }

}
