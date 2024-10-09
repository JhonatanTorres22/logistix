import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, Input, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Curso, CursoBuscarPlan, CursoByCiclo, CursoDesfasar, CursoEliminar, CursoExcel, CursoRevertirRenovacion } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { CursoSignal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { CursoService } from 'src/app/plan-de-estudios/infraestructure/services/curso.service';
import { CursoAddComponent } from '../curso-add/curso-add.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiModalTemplateComponent } from 'src/app/core/components/ui-modal-template/ui-modal-template.component';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { CursoPreRequisitoComponent } from '../curso-pre-requisito/curso-pre-requisito.component';
import { PlanEstudioCardComponent } from "../../plan-estudio-card/plan-estudio-card.component";
import { PlanEstudio } from 'src/app/plan-de-estudios/domain/models/plan-estudio.model';
import { CicloPageComponent } from '../../ciclo-page/ciclo-page.component';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';

import { read, utils, WorkBook, WorkSheet } from 'xlsx';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'curso-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonIconComponent,
    UiButtonComponent,
    CursoAddComponent,
    UiModalTemplateComponent,
    CursoPreRequisitoComponent,
    CicloPageComponent,
    PlanEstudioCardComponent,
    UiUploaderFilesComponent,
],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.scss'
})
export class CursoListComponent implements OnInit {

  @Input() readonly: boolean = false;
  cursoOption = this.signal.cursoOption;
  cursosByCiclo = this.signal.cursosByCiclo;
  cicloList = this.cicloSignal.cicloList;
  cursosList = this.signal.cursosList;
  idPrograma = this.planEstudioSignal.programaId;
  openCursoPreRequisito = this.signal.openCursoPreRequisito;
  cursoSelectPreRequisito = this.signal.cursoSelectPreRequisito;
  renderizarCursos = this.signal.renderizarCursos;
  preRequisitos = this.signal.preRequisitos;
  isModal = this.planEstudioSignal.isModal;
  planesDeEstudio = this.planEstudioSignal.planesDeEstudio;
  file = this.mensajeriaSignal.file;

  
  accionCurso: 'ELIMINAR' | 'EDITAR';

  @ViewChild('templatePlan') templatePlan: TemplateRef<any>
  // @ViewChild('templatePlan') templatePlan: TemplateRef<any>

  planEstudioEncontrado: PlanEstudio | undefined;

  constructor( 
    private authSignal: AuthSignal,
    private repository: CursoRepository,
    private service: CursoService,
    private cicloRepository: CicloRepository,
    private alert: AlertService,
    private signal: CursoSignal,
    private planEstudioSignal: PlanEstudioSignal,
    private mensajeriaSignal: MensajeriaSignal,
    private cicloSignal: CicloSingal,
    private modal: UiModalService

  ) {

    effect( () => {
      console.log( this.renderizarCursos );

      console.log( this.preRequisitos() );
  
      switch( this.renderizarCursos() ) {
        case 'Obtener': {
          this.obtener();
          this.obtenerCiclos();
          this.renderizarCursos.set('')
        }; break
      }
    }, { allowSignalWrites: true })

  }

  ngOnInit(): void {
    this.obtener();
    this.obtenerCiclos();
    
  }

  


  obtener() {
    this.repository.obtenerPorPrograma( this.idPrograma() ).subscribe({
      next: ( cursos ) => {
        console.log( cursos );
        this.cursosList.set( cursos )
        const cursoByCiclo = cursos.reduce( ( a: CursoByCiclo[], b: Curso ) => {

          const existeCiclo = a.findIndex( a => a.ciclo == b.definicionCiclo);
            if( existeCiclo == -1 ) {

              const newCiclo: CursoByCiclo = {
                cicloNumero: 0,
                idCiclo: b.idCiclo,
                ciclo: b.definicionCiclo,
                cursosPlan: [],
                cursos: [b]
              }
              a.push( newCiclo )
              return a
            }

            a[existeCiclo].cursos.push( b );


          return a
        }, [] )
        console.log( cursoByCiclo );
        this.cursosByCiclo.set( cursoByCiclo.sort( ( a, b) =>  a.idCiclo  - b.idCiclo ) )
        // if( this.cursoSelectPreRequisito().id != 0 ) {
        //   this.cursoSelectPreRequisito.update( curso => curso.id ==  )
        // } 
        console.log();
      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }

  eliminarCursosConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmar', '¿Está seguro que desea eliminar el curso?').then(isConfirm => {
      if(!isConfirm){return}
      const eliminarCurso: CursoEliminar[] = this.cursosList().map( curso => {
        return { id: curso.id, usuarioId: parseInt( this.authSignal.currentRol().id ) }
      })
      this.eliminarCursos( eliminarCurso )
    })
  }

  eliminarCursos = ( curso : CursoEliminar[] ) => {
    this.repository.eliminarMasivo(curso).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('Los cursos fueron eliminados de manera correcta', 'success', 6);
        setTimeout(() => {
          this.obtener()
        }, 300);
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar los cursos', 'error', 6);
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



  openFormCurso( template: TemplateRef<any>, accion: string, cicloAdd?: CursoByCiclo ) {
    const curso = {...this.cursoOption()};
    const ciclo = {...this.signal.cursoCicloSelect()};

    this.cursoOption.set( this.signal.cursoDafault );
    console.log( curso );
    let titleModal = 'Editar Curso';

    if( accion == 'Crear') {
      cicloAdd ? this.signal.cursoCicloSelect.set( cicloAdd ) : '';
      // curso ? this.signal.cursoSelect.set( curso ) : titleModal = 'Crear Curso';
      titleModal = 'Crear Curso';

      this.openModalFormCurso( template, titleModal );

      return
    }

    this.accionCurso = 'EDITAR';
    this.buscarCursoEnPlan( curso.id! ).then( tienePlanEstudio =>{
      this.isModal.set( true );
      if( tienePlanEstudio ) {
        
        console.log('Mostrar el card del plan de estudios...');
        this.modal.openTemplate({
          template: this.templatePlan,
          titulo: 'CURSO ASIGNADO'
        });
        return
      }

      ciclo ? this.signal.cursoCicloSelect.set( ciclo ) : '';
      // curso ? this.signal.cursoSelect.set( curso ) : titleModal = 'Crear Curso';
      titleModal = 'Editar Curso';
      this.signal.cursoSelect.set( curso )
      this.openModalFormCurso( template, titleModal )

    })

  }

  openModalFormCurso = ( template: TemplateRef<any>, titleModal: string ) => {
    this.modal.openTemplate( {
      template,
      titulo: titleModal
    } ).afterClosed().subscribe( resp => {
      console.log(resp);
      if( resp == 'cancelar') {
        this.signal.setCursoSelectDefault();
        return
      }
      this.signal.setCursoSelectDefault();
      this.obtener();

    });
  }

  obtenerCiclos() {
    this.cicloRepository.obtener().subscribe({
      next: ( ciclos ) => {
        console.log( ciclos );
        this.cicloList.set( ciclos )
      }, error: ( error ) => {
        console.log( error );
        
      }
    })
  }

  getNombreCiclo( idCiclo: number ): Ciclo {
    const ciclo = this.cicloList().find( ciclo => ciclo.id == idCiclo );

    return ciclo!
  }

  addPreRequisito = ( curso: Curso) => {

    this.preRequisitos.set( this.signal.preRequisitoDefault )
    this.openCursoPreRequisito.set( true );
    this.cursoSelectPreRequisito.set( curso );
    // this.cursosList.update(  cursoFiltro => cursoFiltro.filter( cursoItem => cursoItem.idCiclo !== curso.idCiclo) )
    // this.alert.sweetAlert('info', 'ATENCIÓN', 'PENDIENTE DE IMPLEMENTAR');
    console.log(curso);
    
  }

  eliminarConfirm = () => {
    //Se quito el parametro curso: Curso por que ahora se obtiene el curso desde el signal cuando hace clic derecho
    const curso = this.cursoOption();
    this.buscarCursoEnPlan( curso.id ).then( tienePlanEstudio =>{
      this.isModal.set( true );
      if( tienePlanEstudio ) {
        this.accionCurso = 'ELIMINAR';
        console.log('Mostrar el card del plan de estudios...');
        this.modal.openTemplate({
          template: this.templatePlan,
          titulo: 'CURSO ASIGNADO'
        });
        return
      }

      this.alert.sweetAlert('question', 'Confirmar', '¿Está seguro que desea eliminar el curso?').
        then(isConfirm => {
          if(!isConfirm){return}
          const eliminarCurso: CursoEliminar = {
            id : curso.id,
            usuarioId: parseInt( this.authSignal.currentRol().id )
          }     
          this.eliminar( eliminarCurso )
        })

    } )

  }

  eliminar = ( curso : CursoEliminar ) => {
    this.repository.eliminar(curso).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('El curso fue eliminado de manera correcta', 'success', 6);
        setTimeout(() => {
          this.obtener()
        }, 300);
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar el curso', 'error', 6);

      }
    })
  }

  buscarCurso = () => {
    
  }

  buscarCursoEnPlan = ( cursoId: number ) => {

    return new Promise<boolean>( resolve  => {
      
      this.repository.buscarCursoEnPlanEstudios( cursoId ).subscribe({
        next: ( response ) => {
          console.log( response );
          // this.alert.showAlert('Buscando....', 'info', 2)
          if ( response.length > 0  ) {
            this.planEstudioEncontrado = {
              archivo: response[0].archivo,
              descripcionGrado: '',
              descripcionTitulo: '',
              detallePerfil: '',
              estadoCaducidad: '',
              estadoMatricula: response[0].estadoMatricula,
              id: response[0].id,
              idProgramaAcademico: 0,
              finVigencia: '',
              inicioVigencia: '',
              nombre: response[0].nombre,
              resolucion: ''
            }
            resolve( true );
          }
          
          resolve( false );

        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error al buscar el curso', 'error', 6);
          resolve( true );
        }
      });

    });

  }

  hoverClass = ( curso: Curso) => {

    // curso.preRequisitos.map( cursoPre => {
    //   document.getElementById('pre-'+cursoPre.id.toString() )?.classList.add( 'bg-yellow-200', 'text-yellow-700');
    //   document.getElementById('pre-requisito'+cursoPre.id.toString())?.classList.add('absolute','-mb-4');
    // })
    
    // if( this.readonly ) {
    //   return
    // }

    // document.getElementById(curso.id.toString())?.classList.remove('hidden')
    // document.getElementById(curso.id.toString())?.classList.add('flex')

  }

  removeClass = ( curso: Curso ) => {
    
    // curso.preRequisitos.map( cursoPre => {
    //   document.getElementById('pre-'+cursoPre.id.toString() )?.classList.remove( 'bg-yellow-200', 'text-yellow-700');
    //   document.getElementById('pre-requisito'+cursoPre.id.toString())?.classList.remove('absolute');

    // })
    // if( this.readonly ) {
    //   return
    // }

    // document.getElementById(curso.id.toString())?.classList.add('hidden');
    // document.getElementById(curso.id.toString())?.classList.remove('flex');

  }

  renovar = ( template: TemplateRef<any> ) => {
    
    this.buscarCursoEnPlan( this.cursoOption().id ).then( tienePlanEstudio =>{
      if( !tienePlanEstudio ) {
        this.alert.sweetAlert('info', 'ATENCIÓN', `El curso ${ this.cursoOption().nombreCurso } no se encuentra en un plan de estudios, no se puede renovar`);
        return
      }

      this.alert.sweetAlert('question', 'Confirmar', '¿Está seguro que desea renovar el curso?')
      .then( isConfirm => {
        if(!isConfirm){
          this.cursoOption.set( this.signal.cursoDafault );
          return
        }
        
        this.modal.openTemplate({
          template,
          titulo: 'Renovar Curso'
        }).afterClosed().subscribe( resp => {
          console.log(resp);
          if( resp == 'cancelar') {
            this.cursoOption.set( this.signal.cursoDafault );
            return
          }
          
          this.obtener();
        } )

      })

    })
    
    
  }

  desfasarConfirm = ( ) => {
    // console.log('Implementación pendiente... :)');
    
    this.alert.sweetAlert('question', 'Confirmar', '¿Está seguro que desea desfasar el curso?')
      .then( isConfirm => {
        if(!isConfirm){
          this.cursoOption.set( this.signal.cursoDafault );
          return
        }
        const curso: CursoEliminar = {
          id: this.cursoOption().id,
          usuarioId: parseInt( this.authSignal.currentRol().id )
        }
        this.desfasar( curso )
      })

  }

  desfasar = ( curso: CursoDesfasar  ) => {
    this.repository.desfasar( curso ).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('El curso fue desfasado de manera correcta', 'success', 6);
        this.obtener()
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al desfasar el curso', 'error', 6);

      }
    })
  }

  revertirConfirm = () => {
    this.alert.sweetAlert('question', 'Confirmar', 'Al revertir este curso será ELIMINADO, y en su lugar volverá a estar activo el curso anterior. ¿Está seguro que desea revertir curso?')
      .then( isConfirm => {
        if(!isConfirm){
          this.cursoOption.set( this.signal.cursoDafault );
          return
        }
        const curso: CursoRevertirRenovacion = {
          id: this.cursoOption().id,
          usuarioId: parseInt( this.authSignal.currentRol().id )
        }
        this.revertirRenovacion( curso )
      })
  }

  revertirRenovacion = ( curso: CursoRevertirRenovacion  ) => {
    this.repository.revertirRenovacion( curso ).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alert.showAlert('El curso fue revertido de manera correcta', 'success', 6);
        this.obtener()
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al revertir el curso', 'error', 6);

      }
    })
  }

  openOptions = ( event: any, curso: Curso, ciclo: CursoByCiclo ) => {


    this.cursoOption.set( curso );
    this.signal.cursoCicloSelect.set( ciclo );

    // console.log( event );
    // console.log( curso );
  }


}
