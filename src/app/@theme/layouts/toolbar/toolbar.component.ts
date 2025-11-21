// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { NavRightComponent } from './toolbar-right/toolbar-right.component';
import { NavLeftComponent } from './toolbar-left/toolbar-left.component';
import { SemestreAcademicoRepository } from 'src/app/programas-academicos/domain/repositories/semestre-academico.repository';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { ListarInfoDirectorRepository } from 'src/app/auth/domain/repositories/listarInfoDirector.repository';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { FacultadRepository } from 'src/app/programas-academicos/domain/repositories/facultad.repository';
import { ProgramaRepository } from 'src/app/programas-academicos/domain/repositories/programa.repository';
import { FacultadSignal } from 'src/app/programas-academicos/domain/signals/facultad.signal';
import { ProgramaSignal } from 'src/app/programas-academicos/domain/signals/programa.signal';
import { forEach } from 'lodash';
import { PlanEstudioRepository } from 'src/app/plan-de-estudios/domain/repositories/plan-estudio.repository';
import { CicloRepository } from 'src/app/plan-de-estudios/domain/repositories/ciclo.repository';
import { CicloSingal } from 'src/app/plan-de-estudios/domain/signal/ciclo.signal';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule, NavLeftComponent, NavRightComponent, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class NavBarComponent implements OnInit {
  // public props
  HeaderBlur: boolean;

  currentInfoDirector = this.auth.currentInfoDirector;
  idPrograma = this.PlanEstudioSignal.programaId;
  facultadesList = this.facultadSignal.facultadesList;
  programasGlobal = this.programaSignal.programasGlobal;
  planesDeEstudio = this.PlanEstudioSignal.planesDeEstudio;
  planEstudioUltimoConResolucion = this.PlanEstudioSignal.planEstudioUltimoConResolucion;
  cicloList = this.cicloSignal.cicloList;

  constructor(
    private semestreRepository: SemestreAcademicoRepository,
    private facultadRepository: FacultadRepository,
    private programaRepository: ProgramaRepository,
    private planEstudioRepository: PlanEstudioRepository,
    private cicloRepository: CicloRepository,
    private repository: ListarInfoDirectorRepository,

    private semestreSignal: SemestreSignal,
    private PlanEstudioSignal: PlanEstudioSignal,
    private facultadSignal: FacultadSignal,
    private programaSignal: ProgramaSignal,
    private cicloSignal: CicloSingal,
    private auth: AuthSignal,

    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    
    // this.obtenerSemestres();
    // this.obtenerInfoDirector();
    // this.obtenerCiclos();

    // this.obtenerFacultades().then( hayFacultad => {
    //   if( !hayFacultad ) {
    //     return
    //   }

    //   this.facultadesList().forEach( facultad => {
    //     this.obtenerProgramas( facultad.id );
        
    //     // console.log( this.programasGlobal() );
    //   });
      
    // })

  }

  obtenerFacultades = () => {
    return new Promise( resolve => {
      this.facultadRepository.obtenerFacultades().subscribe({
        next: ( facultades ) => {
          // console.log( facultades );
          this.facultadesList.set( facultades );

          if( this.facultadesList().length == 0 ) {
            resolve( false );
          }

          resolve( true );
        }, error: ( error ) => {
          console.log( error );
          resolve( false )
          
        }
      })
    })
  }

  obtenerProgramas = ( idFacultad: number ) => {
    this.programaRepository.obtenerProgramas( idFacultad ).subscribe({
      next: ( programas ) => {
        this.programasGlobal.update( programasActual => {
          return [ ...programasActual, ...programas]
        });

        // console.log( this.programasGlobal() );
        
      }
    });
  }

  obtenerSemestres = () => {
    this.semestreRepository.obtenerSemestres().subscribe({
      next: ( semestres ) => {
        this.semestreSignal.setSemestresAcademicos( semestres );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los semestres', 'error', 6);
      }
    });
  }

  obtenerInfoDirector = () => {
    // console.log(rol.Nombre,'****');
    const rolSeleccionado = 'Dir';
    console.warn( rolSeleccionado);
    
    if(rolSeleccionado === 'Dir'){
      this.repository.obtener(parseInt( this.auth.currentRol().id )).subscribe({
        next: (infoDirector) => {
          // console.log( infoDirector );
          
          localStorage.setItem('currentInfoDirector', JSON.stringify(infoDirector));

          if( infoDirector.length == 0 ) {
            throw('El director no tiene programa asignado');
          }
          this.currentInfoDirector.set(infoDirector);
          this.idPrograma.set( this.currentInfoDirector()[0].idProgramaAcademico )
          if( this.idPrograma() != 0 ) {
            this.obtenerPlanesDeEstudios();
          }
          console.log( this.idPrograma() );
        }
      });
    }
  }
  
  obtenerPlanesDeEstudios() {
    
    this.planEstudioRepository.obtener( this.idPrograma() ).subscribe({
      next: ( planes ) => {
        // console.log( planes );
        this.planesDeEstudio.set( planes )
        // console.log(this.planesDeEstudio().filter( plan => plan.resolucion !== null ));
        // console.log( this.planesDeEstudio() );
        
        this.planEstudioUltimoConResolucion.set( this.planesDeEstudio().filter( plan => plan.resolucion !== null )[ this.planesDeEstudio().length - 2] ?? this.PlanEstudioSignal.planEstudioDefault ) 
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los planes de estudios', 'error', 6);
      }
    })
  }

  obtenerCiclos = () => {
    this.cicloRepository.obtener().subscribe({
      next: ( ciclos ) => {
        console.log( ciclos );
        this.cicloList.set( ciclos );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los ciclos', 'error', 6);
      }
    })
  }


}





  // currentInfoDirector = this.auth.currentInfoDirector;
  // planesDeEstudio = this.PlanEstudioSignal.planesDeEstudio;
  // semestreSelect = this.semestreSignal.semestreSelect;
  // semestresAcademicos = this.semestreSignal.semestresAcademicos;
  // infoDirector: ListarInfoDirector[] = []
  // constructor(
    
  //   private semestreSignal: SemestreSignal,
    
  // ) {

  //   effect( () => {
  //     console.log( this.currentInfoDirector() );
  //     localStorage.setItem('currentInfoDirector', JSON.stringify( this.infoDirector));
  //     this.currentInfoDirector.set( JSON.parse( localStorage.getItem('currentInfoDirector')! ) )
  //   })

  // }

  // ngOnInit(): void {
  //   this.obtenerInfoDirector();
  // }

