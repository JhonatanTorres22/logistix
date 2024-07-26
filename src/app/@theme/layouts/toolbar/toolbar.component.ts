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
  constructor(
    private semestreRepository: SemestreAcademicoRepository,
    private semestreSignal: SemestreSignal,
    private alert: AlertService,
    private PlanEstudioSignal: PlanEstudioSignal,
    private facultadRepository: FacultadRepository,
    private facultadSignal: FacultadSignal,
    private programaSignal: ProgramaSignal,
    private programaRepository: ProgramaRepository,
    private auth: AuthSignal,
    private repository: ListarInfoDirectorRepository,
  ) {}

  ngOnInit(): void {
    
    this.obtenerSemestres();
    this.obtenerInfoDirector();
    this.obtenerFacultades().then( hayFacultad => {
      if( !hayFacultad ) {
        return
      }

      this.facultadesList().forEach( facultad => {
        this.obtenerProgramas( facultad.id );
        
        // console.log( this.programasGlobal() );
      });
      
    })
  }

  obtenerFacultades = () => {
    return new Promise( resolve => {
      this.facultadRepository.obtenerFacultades().subscribe({
        next: ( facultades ) => {
          console.log( facultades );
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

        console.log( this.programasGlobal() );
        
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
    const rolSeleccionado = this.auth.currentRol().rol.substring(0,3);
    
    if(rolSeleccionado === 'Dir'){
      this.repository.obtener(parseInt( this.auth.currentRol().id )).subscribe({
        next: (infoDirector) => {
          console.log( infoDirector );
          
          // this.infoDirector = infoDirector;
          localStorage.setItem('currentInfoDirector', JSON.stringify(infoDirector));
          // this.planesDeEstudio.set([]);
          // this.semestresAcademicos.set( [] )
          if( infoDirector.length == 0 ) {
            // this.auth.idSemestres.set([]);
          }
          this.currentInfoDirector.set(infoDirector);
          this.idPrograma.set( this.currentInfoDirector()[0].idProgramaAcademico )
          console.log( this.idPrograma() );
        }
      });
    }
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

