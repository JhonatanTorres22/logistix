import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoSignal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { UiButtonComponent } from "../../../../core/components/ui-button/ui-button.component";
import { Curso, CursoAddPreRequisito, CursoDeletePreRequisito } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { AlertService } from 'src/app/demo/services/alert.service';

@Component({
  selector: 'curso-pre-requisito',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent],
  templateUrl: './curso-pre-requisito.component.html',
  styleUrl: './curso-pre-requisito.component.scss'
})
export class CursoPreRequisitoComponent implements OnInit {
  @ViewChild('curso') curso: MatDrawer;
  openCursoPreRequisito = this.signal.openCursoPreRequisito;
  cursoSelectPreRequisito = this.signal.cursoSelectPreRequisito;
  // preRequisitos: number[];
  preRequisitos = this.signal.preRequisitos;
  renderizarCursos = this.signal.renderizarCursos;
  cursosList = this.signal.cursosList;
  currentRol = this.authSignal.currentRol;

  constructor(
    private signal: CursoSignal,
    private authSignal: AuthSignal,
    private repository: CursoRepository,
    private alert: AlertService,
  ) {
    effect( () => {
      console.log( this.openCursoPreRequisito() );
      this.preRequisitos.set( [] );
     
      
      this.openCursoPreRequisito() ? this.curso.open() : ''
      this.openCursoPreRequisito.set( false );
      let preRequisitosDelCurso: Curso[] = [];
      // console.log( this.cursoSelectPreRequisito().preRequisitos.length );
      
      // if( this.cursoSelectPreRequisito().preRequisitos.length > 0 ) {
      //   const preRequisitos = this.cursosList().map( curso => {
    
      //     this.cursoSelectPreRequisito().preRequisitos.map( pre => {
      //       if( pre.id == curso.id ) {
      //         preRequisitosDelCurso.push( curso )
      //       }
      //     })
      //   })
      //   console.log( preRequisitosDelCurso );
      //   this.preRequisitos.set( preRequisitosDelCurso )
      // }

    }, { allowSignalWrites: true })
  }
  ngOnInit(): void {
    
  }

  cerrar = () => {
    this.cursoSelectPreRequisito.set( this.signal.cursoDafault );
    this.preRequisitos.set( [] );
    this.renderizarCursos.set('Obtener')
    this.curso.close();
  }

  drop(event: CdkDragDrop<string[]>) {

    console.log( this.preRequisitos() );
    

    if (event.previousContainer === event.container) {
      // console.log('IF');

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // console.log('ELSE');
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      //AGREGAR PREREQUISITO
      this.agregarPreRequisito();
    }
  }

  agregarPreRequisito = () => {

    const cursoAddPreRequisito: CursoAddPreRequisito = {
      id: this.cursoSelectPreRequisito().id,
      idCursoPreRequisito: this.preRequisitos()[0].id,
      usuarioId: parseInt( this.currentRol().id )
    }

    this.repository.addPreRequisito( cursoAddPreRequisito ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('El pre-requisito fué agregado correctamente', 'success', 6);
        // this.renderizarCursos.set('Obtener');
      }, error: ( error ) => { 
        console.log( error );
        this.alert.showAlert('Ocurrió un error al agregar el pre-requisito', 'error', 6);
      }
    })
  }

  eliminarPreRequisitoConfirm = ( preRequisito: Curso) => {
    const eliminarPreRequisito: CursoDeletePreRequisito = {
      id: this.cursoSelectPreRequisito().id,
      idCursoPreRequisito: preRequisito.id,
      usuarioId: parseInt( this.currentRol().id )
    }
    this.alert.sweetAlert('question', 'Confirmación!', '¿Está seguro que desea eliminar el pre-requisito?')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }
        this.preRequisitos.set( this.preRequisitos().filter( curso => curso.id !== preRequisito.id ) )
        this.cursoSelectPreRequisito.update( curso => {
          return {
            ...curso,
            preRequisitos: this.preRequisitos()
          }
        })
        console.log( eliminarPreRequisito );
        
        setTimeout(() => {
          this.eliminarPreRequisito( eliminarPreRequisito );
        }, 200);
      })

  }

  eliminarPreRequisito = ( preRequisito: CursoDeletePreRequisito ) => {
    this.repository.deletePreRequisito( preRequisito ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('El pre-requisito fué eliminado de manera correcta.', 'success', 6 );
        // this.preRequisitos.set( this.preRequisitos().filter( pre => pre.id != preRequisito.id ) )
        this.renderizarCursos.set('Obtener');
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar el pre-requisito', 'error', 6 );
        
      }
    })
  }

}
