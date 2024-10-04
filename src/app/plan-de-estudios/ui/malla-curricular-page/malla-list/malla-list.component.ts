import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { RutasSignal } from 'src/app/core/signals/rutas.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Ciclo } from 'src/app/plan-de-estudios/domain/models/ciclo.model';

import { CursoCrear } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { PreRequisitoInsert, PreRequisitoDelete, CursoMallaPreRequisitoInsert, CursoMallaPreRequisitoDelete } from 'src/app/plan-de-estudios/domain/models/pre-requisito.model';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CursoPlanRepository } from 'src/app/plan-de-estudios/domain/repositories/curso-plan.repository';
import { CursoRepository } from 'src/app/plan-de-estudios/domain/repositories/curso.repository';
import { PreRequisitoRepository } from 'src/app/plan-de-estudios/domain/repositories/pre-requisito.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';
import { CursoPlanSignal } from 'src/app/plan-de-estudios/domain/signal/curso-plan.signal';
import { CursoSignal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { CicloPageComponent } from '../../ciclo-page/ciclo-page.component';
import { CursoPageComponent } from '../../curso-page/curso-page.component';
import { MallaRepository } from 'src/app/plan-de-estudios/domain/repositories/malla.repository';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';
import { CursoImportTemplateComponent } from '../../curso-page/curso-import-template/curso-import-template.component';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { CursoMallaByCiclo, Malla, MallaInsert } from 'src/app/plan-de-estudios/domain/models/malla.model';
import { MallaSignal } from 'src/app/plan-de-estudios/domain/signal/malla.signal';
import { select } from 'd3-selection';
@Component({
  selector: 'malla-list',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    CicloPageComponent,
    CursoPageComponent,
    UiCardNotItemsComponent,
    UiUploaderFilesComponent,
    CursoImportTemplateComponent,
    UiButtonComponent
  ],
  templateUrl: './malla-list.component.html',
  styleUrl: './malla-list.component.scss'
})
export class MallaListComponent  implements OnInit {
  conexionesPreRequisitos: { desde: number; hacia: number }[] = [];
  mostrarFlecha: boolean = true;

  @Input() readonly: boolean = false;
  @Input() preRequisito: boolean = false;
  cicloSelect: Ciclo;

  cursoPreRequisito: CursoMallaPreRequisitoInsert;
  preRequisitosFromCursoSelect: number[] = [];
  showBtnActivarEdicion: boolean = false;

  cursosPlanByCiclo = this.cursoPlanSignal.cursosPlanByCiclo;
  cursosPlanPreRequisitoByCiclo = this.cursoPlanSignal.cursosPlanPreRequisitoByCiclo;
  cursosPlan = this.cursoPlanSignal.cursosPlan;
  cursosPlanPreRequisito = this.cursoPlanSignal.cursosPlanPreRequisito;
  cursosMalla = this.mallaSignal.cursosMalla;
  cursosMallaPreRequisito = this.mallaSignal.cursosMallaPreRequisito;
  cursosMallaByCiclo = this.mallaSignal.cursosMallaByCiclo;
  cursosMallaPreRequisitoByCiclo = this.mallaSignal.cursosMallaPreRequisitoByCiclo;
  cicloList = this.cicloSignal.cicloList;
  planEstudioSelect = this.signal.planEstudioSelect;
  cursosList = this.cursoSignal.cursosList;
  cursosImportExcel = this.cursoSignal.cursosImportExcel;
  currentInfoDirector = this.authSignal.currentInfoDirector;
  file = this.mensajeriaSignal.file;
  renderizarCursos = this.cursoSignal.renderizarCursos;
  cursoSelectPreRequisito = this.cursoSignal.cursoSelectPreRequisito; //YA NO SE USA
  cursoMallaSelectPreRequisito = this.mallaSignal.cursoMallaSelectPreRequisito;
  // preRequisitosCursoPlan = this.cursoPlanSignal.preRequisitosCursoPlan;


  idPrograma = this.signal.programaId;
  isModal = this.signal.isModal;
  isModalOfItself = this.signal.isModalOfItself;
  currentRuta = this.rutaSignal.currentRuta;

  constructor(
    private cursosRepository: CursoRepository,
    private mallaRepository: MallaRepository,
    private cicloRepository: CicloRepository,
    private preRequisitoRepository: PreRequisitoRepository,

    private cursoSignal: CursoSignal,
    private cursoPlanSignal: CursoPlanSignal,
    private cicloSignal: CicloSingal,
    private mensajeriaSignal: MensajeriaSignal,
    private mallaSignal: MallaSignal,
    private authSignal: AuthSignal,
    private signal: PlanEstudioSignal,
    private rutaSignal: RutasSignal,

    private alert: AlertService,
    private modal: UiModalService,
    private router: Router
  ) {
    effect( () => {
      if( this.planEstudioSelect().id !== 0 ) {
        console.log( this.planEstudioSelect() );
        // this.obtenerCursosPorPlanEstudioPrerequisito();
      }
      
    })
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    
    this.resetPreRequisito();
  }

  ngOnInit(): void {

    this.obtenerMalla();

    this.obtenerCursos()

    this.obtenerMallaPreRequisitos();
  
  }

  /* */

  listarDesfasados = ( template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Cursos Desfasados',
    }).afterClosed().subscribe( data => {
      // this.cursoDesfasadoSelected.set( this.cursoSignal.cursoDesfasadoDefault );
      if( data === 'cancelar' ) {
        console.log( data );
        return
      }
      console.log( data );
      
    } )
  }

  openModalCursos = ( template: TemplateRef<any> ) => {
    this.modal.openTemplate({
      template,
      titulo: 'Cursos',
    }).afterClosed().subscribe( data => {
      // this.cursoDesfasadoSelected.set( this.cursoSignal.cursoDesfasadoDefault );
      if( data === 'cancelar' ) {
        console.log( data );
        return
      }
      console.log( data );
      
    } )
  }
  
  obtenerCursos() {
    this.cursosRepository.obtenerPorPrograma( this.idPrograma() ).subscribe({
      next: ( cursos ) => {
        console.log( cursos );
        this.cursosList.set( cursos )

      }, error: ( error ) => {
        console.log(error);
        this.alert.showAlert('Ocurrio un error al obtener los cursos', 'error', 5);
      }
    })
  }

  agregar = () => {

  }

  showModalImportar = ( template: TemplateRef<any> ) => {
    this.modal.openTemplate({
      template,
      titulo: 'Importar Cursos',
    }).afterClosed().subscribe( data => {
      console.log( data );
      if( data === 'cancelar' ) {
        console.log( data );
        return
      }
    })
  }

  guardarCursosImport = () => {
    // console.log( this.cursosImportExcel());
    

    // return
    this.alert.sweetAlert('question', 'Confirmación', 'Está seguro que desea guardar los cursos importados')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

        const cursos: CursoCrear[] = this.cursosImportExcel().map( curso => {
          const cicloId = this.cicloList().find( (ciclo: Ciclo) => parseInt( ciclo.cicloNumero ) == curso.ciclo )?.id;
          const programaId = this.currentInfoDirector()[0].idProgramaAcademico;
    
          return {
            idPrograma: programaId,
            idCiclo: cicloId!,
            codigoCurso: curso.codigo_curso,
            nombreCurso: curso.nombre_curso,
            tipoEstudio: curso.tipo_estudio,
            tipoCurso: curso.tipo_curso,
            competencia: curso.competencia,
            horasTeoricas: curso.ht,
            descripcion: curso.nombre_curso,
            horasPracticas: curso.hp,
            totalHoras: curso.th,
            totalCreditos: curso.creditos,
            usuarioId: parseInt( this.authSignal.currentRol().id )
          }
    
        });
    
        // console.log( cursos );
        this.insertarCursosMasivos( cursos ).then( isInsert => {
          if( !isInsert ) {
            // this.alert.showAlert('Ocurrió un error al guardar los cursos', 'error', 6);
            return
          }
          setTimeout(() => {
            this.insertarCursoToMallaIsValid();
          }, 1000);
        });
      } )

    
    
  }


  insertarCursosMasivos = ( cursos: CursoCrear[]) => {

    return new Promise<boolean>( resolve => {

      this.cursosRepository.agregarMasive( cursos ).subscribe({
        next: ( data ) => {
          console.log( data );
          this.alert.showAlert('Los cursos fueron guardados correctamente', 'success', 6);
          // this.modal.getRefModal().close('Obtener');
          this.file.set( this.mensajeriaSignal.fileDefault );
          this.obtenerCursos();
          
          resolve( true );
          // this.obtenerCursoPlanActual();
        }, error: ( error ) => {
          resolve( false );
          console.log( error );
          this.alert.showAlert('Ocurrió un error al guardar los cursos', 'error', 6);
        }
      });

    })
  }

  insertarCursoToMallaIsValid = () => {
    console.log( this.cursosList() );
    console.log( this.cursosImportExcel() );
    
    const cursoMalla: MallaInsert[] = this.cursosList().map( (curso, index, {length}) => {

      const cicloId = this.cicloList().find( (ciclo: Ciclo) => parseInt( ciclo.cicloNumero ) == this.cursosImportExcel()[index].ciclo )?.id;
      // console.log( curso.codigoCurso == this.cursosImportExcel()[index].codigo_curso );
      // console.log( curso.nombreCurso == this.cursosImportExcel()[index].nombre_curso );
      if( curso.codigoCurso != this.cursosImportExcel()[index].codigo_curso || curso.nombreCurso != this.cursosImportExcel()[index].nombre_curso ) {
        console.log('No son iguales');
        return {
          idPlanEstudio: 0,
          idCurso: 0,
          idCiclo: 0,
          userId: 0
        }
      }

      const malla: MallaInsert = {
        idPlanEstudio: this.planEstudioSelect().id,  //index != 10 ? this.planEstudioSelect().id : 0,
        idCurso: curso.id,
        idCiclo: cicloId!,
        userId: parseInt( this.authSignal.currentRol().id )
      }

      return malla

    });

    const isValid = cursoMalla.some( malla => ( malla.idCiclo != 0 && malla.idCurso != 0 && malla.idPlanEstudio != 0 && malla.userId != 0 ) );
    console.log( isValid );
    
    if( !isValid ) {
      console.log( cursoMalla );
      
      this.alert.sweetAlert('warning', 'Advertencia', 'Ocurrió un error al guardar los cursos, por favor verifique los datos');
      //Eliminar importación de cursos
      return
    }

    this.insertarCursoToMalla( cursoMalla );

  }

  insertarCursoToMalla = ( malla: MallaInsert[] ) => {
    console.log( malla );
    this.mallaRepository.insertMalla( malla ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.alert.showAlert('Los cursos fueron guardados correctamente', 'success', 6);
        this.modal.getRefModal().close('Obtener');
        this.file.set( this.mensajeriaSignal.fileDefault );
        // this.renderizarCursos.set( 'Obtener' );
        this.obtenerMalla();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al guardar los cursos', 'error', 6);
      }
    });
  }

  revertirDesfaseConfirm = () => {

  }
  /* */

  obtenerMalla() {
    this.mallaRepository.getMalla( this.planEstudioSelect().id ).subscribe({
      next: ( cursosPlan ) => {
        console.log( cursosPlan );
        
        this.cursosMalla.set( cursosPlan );
        const cursoByCiclo = this.cursosMalla().reduce( ( a: CursoMallaByCiclo[], b: Malla ) => {
          console.log( b);
          
          const existeCiclo = a.findIndex( a => a.ciclo == b.cicloRomano);
            if( existeCiclo == -1 ) {

              const newCiclo: CursoMallaByCiclo = {
                cicloNumero:  b.cicloNumero,
                idCiclo: 0,
                ciclo: b.cicloRomano,
                cursosMalla: [b]
              }
              a.push( newCiclo )
              return a
            }

            a[existeCiclo].cursosMalla.push( b );


          return a
        }, [] )
        console.log( cursoByCiclo );
        this.cursosMallaByCiclo.set( cursoByCiclo.sort( ( a, b) =>  a.cicloNumero - b.cicloNumero ) )

      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }

  obtenerMallaPreRequisitos = () => {
    this.mallaRepository.getMallaPreRequisitos( this.planEstudioSelect().id ).subscribe({
      next: ( cursosPlan ) => {
        console.log( cursosPlan );
        
        setTimeout(() => {
          setTimeout(() => {
            window.addEventListener('resize', this.dibujarConexionesPreRequisitos.bind(this));
          }, 700);
          this.inicioFlechaSVG();
          this.conexionAutomaticaCurso()
        }, 400);
        this.cursosMallaPreRequisito.set( cursosPlan );
        const cursoByCiclo = this.cursosMallaPreRequisito().reduce( ( a: CursoMallaByCiclo[], b: Malla ) => {
          console.log( b);
          
          const existeCiclo = a.findIndex( a => a.ciclo == b.cicloRomano);
            if( existeCiclo == -1 ) {

              const newCiclo: CursoMallaByCiclo = {
                cicloNumero:  b.cicloNumero,
                idCiclo: 0,
                ciclo: b.cicloRomano,
                cursosMalla: [b]
              }
              a.push( newCiclo )
              return a
            }

            a[existeCiclo].cursosMalla.push( b );

            return a
      }, [] )
      this.cursosMallaPreRequisitoByCiclo.set( cursoByCiclo.sort( ( a, b) =>  a.cicloNumero - b.cicloNumero ) )

    }, error: ( error ) => {
      console.log(error);
      this.alert.showAlert('Ocurrio un error al obtener los cursos', 'error', 5);
    }
  })
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


  volver = () => {
    this.router.navigate(['/plan-de-estudios']);
  }

  onEliminarConfirm = () => {
    
  }

  hoverClass = ( curso: Malla) => {
    console.log( curso );
    
    curso.preRequisitos.map( cursoPre => {
      document.getElementById('card-'+cursoPre?.idMalla.toString() )?.classList.add( 'bg-blue-200', 'text-blue-700');
      // document.getElementById('pre-requisito'+cursoPre?.idMalla.toString())?.classList.add('absolute','-mb-4');
    })
    
    // if( this.readonly ) {
    //   return
    // }


    // document.getElementById(curso.idMalla.toString())?.classList.remove('hidden')
    // document.getElementById(curso.idMalla.toString())?.classList.add('flex')

  }

  removeClass = ( curso: Malla ) => {

    curso.preRequisitos.map( cursoPre => {
      document.getElementById('card-'+cursoPre.idMalla.toString() )?.classList.remove( 'bg-blue-200', 'text-blue-700');
      // document.getElementById('pre-requisito'+cursoPre.idMalla.toString())?.classList.remove('absolute');

    })
    // if( this.readonly ) {
    //   return
    // }


    // document.getElementById(curso.idMalla.toString())?.classList.add('hidden');
    // document.getElementById(curso.idMalla.toString())?.classList.remove('flex');

  }

  activarEdicion = () => {
    this.alert.sweetAlert( 'question', 'Confirmar', 'Los cursos que fueron asignados al Plan de Estudios serán ELIMINADOS, ¿Está seguro que desea Activar la edición de los cursos?')
      .then( isConfirm => {
        if( !isConfirm ) {
          return
        }

      })
  }

  

  selectPreRequisitoPadre = ( curso: Malla ) => {
    console.log( curso );

    // if( !this.cursoPreRequisito || this.cursoPreRequisito.idMalla == 0 ) {
    this.cursoPreRequisito = {
      idMalla: curso.idMalla,
      idMallaPreRequisito: 0,
      curso: curso,
      userId: parseInt( this.authSignal.currentRol().id )
    }

    this.preRequisitosFromCursoSelect = curso.preRequisitos.map( preRequisito => (preRequisito.idMalla) )

    //   return
      
    // } 
    
    
    
  }
  
  selectPreRequsitoHijo = ( curso: Malla ) => {

    if( !this.cursoPreRequisito || this.cursoPreRequisito.idMalla == 0 || curso.cicloNumero >= this.cursoPreRequisito.curso.cicloNumero ) {
      console.log('Falta el padre');
      return
    }

    const existePreRequisito = this.cursoPreRequisito.curso.preRequisitos.findIndex( preRequisito => preRequisito.idMalla == curso.idMalla );

    if( existePreRequisito != -1 ) {
      this.cursoPreRequisito.curso.preRequisitos.splice(existePreRequisito, 1);

      this.alert.sweetAlert('question', 'Confirmación', `¿Desea eliminar el prerequisito ${ curso.nombreCurso }?` ).then( isConfirmed => {
        if( !isConfirmed ) {
          return
        }

        const eliminarPreRequisito: CursoMallaPreRequisitoDelete = {
          idMalla: this.cursoPreRequisito.idMalla,
          idMallaPreRequisito: curso.idMalla,
          userId: parseInt( this.authSignal.currentRol().id ),
        }

        this.eliminarPreRequisito( eliminarPreRequisito );
      })

      // this.preRequisitosFromCursoSelect = this.cursoPreRequisito.curso.preRequisitos.map( preRequisito => (preRequisito.idMalla) )
      return
    }

    this.cursoPreRequisito = {
      ...this.cursoPreRequisito,
      idMallaPreRequisito: curso.idMalla,
    }
    
    this.insertarPreRequisito();

  }

  resetPreRequisito = () => {
    this.cursoPreRequisito = {
      idMalla: 0,
      idMallaPreRequisito: 0,
      curso: {} as Malla,
      userId: 0
    }

    this.preRequisitosFromCursoSelect = [];

  }


  insertarPreRequisito = () => {
    console.log( this.cursoPreRequisito );
    // return
    this.preRequisitoRepository.insertPreRequisitoMalla( this.cursoPreRequisito ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Se inserto correctamente el prerequisito', 'success', 5);
        this.resetPreRequisito();
        this.obtenerMallaPreRequisitos();
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrio un error al insertar el prerequisito', 'error', 5);
      }
    })

  }

  eliminarPreRequisito = ( preRequisito: CursoMallaPreRequisitoDelete ) => {
    console.log( preRequisito );
    this.preRequisitoRepository.deletePreRequisitoMalla( preRequisito ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Se elimino correctamente el prerequisito', 'success', 5);
        this.resetPreRequisito();
        this.obtenerMallaPreRequisitos()

      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrio un error al eliminar el prerequisito', 'error', 5);
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


  inicioFlechaSVG ()  {
    const svg = select('#arrowContainer')
      .attr('width', '100%')
      .attr('height', '100%');

      svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-2 -5 12 10') // Ajusta el viewBox si cambias el d
      .attr('refX', 8) // Cambia refX para centrar mejor la flecha
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6) // Aumenta el ancho de la punta
      .attr('markerHeight', 6) // Aumenta la altura de la punta
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-4 L 10 ,0 L 0,4') // Ajusta la forma de la flecha
      .attr('fill', 'black')
      .style('stroke', 'none');
  }

  conexionAutomaticaCurso () {
    // Limpiar todas las conexiones previas
    this.conexionesPreRequisitos = [];
    // Recorre los ciclos y cursos para establecer las nuevas conexiones
    this.cursosMallaPreRequisitoByCiclo().forEach(ciclo => {
      ciclo.cursosMalla.forEach(curso => {
        if (curso.preRequisitos.length > 0) {
          curso.preRequisitos.forEach(preReq => {
            this.conexionesPreRequisitos.push({ desde: preReq.idMalla, hacia: curso.idMalla });
          });
        }
      });
    });
    // Dibujar todas las nuevas conexiones
    this.dibujarConexionesPreRequisitos();
  }

  visibilidadFlechaPreRequisito () {
    this.mostrarFlecha = !this.mostrarFlecha;
    this.dibujarConexionesPreRequisitos(); // Redibujar las flechas
  }

  dibujarConexionesPreRequisitos  () {
    if (!this.mostrarFlecha) {
      const svg = select('#arrowContainer');
      svg.selectAll('line').remove(); // Eliminar todas las flechas existentes
      return; // No hacer nada más
    }

    const svgElement = document.getElementById('arrowContainer');
    if (!svgElement) {
      console.error('SVG container not found!');
      return; // Salir de la función si no se encuentra el SVG
    }

    const svg = select(svgElement);
    svg.selectAll('line').remove(); // Eliminar todas las flechas existentes

    const svgRect = svgElement.getBoundingClientRect();

    this.conexionesPreRequisitos.forEach(connection => {
      const fromElement = document.getElementById(`card-${connection.desde}`);
      const toElement = document.getElementById(`card-${connection.hacia}`);

      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();

        const startX = fromRect.right - svgRect.left;
        const startY = fromRect.top + fromRect.height / 2 - svgRect.top;
        const endX = toRect.left - svgRect.left;
        const endY = toRect.top + toRect.height / 2 - svgRect.top;

        svg.append('line')
          .attr('x1', startX)
          .attr('y1', startY)
          .attr('x2', endX)
          .attr('y2', endY)
          .attr('stroke', 'black')
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrowhead)');
      }
    });
  }


}
