import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardComponent } from 'src/app/@theme/components/card/card.component';
import { EliminarSeccion, ListarTipoAmbienteSeccion, ListarSecciones } from 'src/app/apertura/domain/models/apertura-seccion.model';
import { AperturaSeccionRepository } from 'src/app/apertura/domain/repositories/apertura-secciones.repository';
import { AperturaSeccionesSignal } from 'src/app/apertura/domain/signal/apertura-secciones.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiCardNotItemsComponent } from 'src/app/core/components/ui-card-not-items/ui-card-not-items.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SeccionesAddComponent } from '../secciones-add/secciones-add.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';

@Component({
  selector: 'app-secciones-list',
  standalone: true,
  imports: [SharedModule, CommonModule,CardComponent, 
    UiLoadingProgressBarComponent,
    MatTableModule, UiButtonComponent,UiCardNotItemsComponent, SeccionesAddComponent],
  templateUrl: './secciones-list.component.html',
  styleUrl: './secciones-list.component.scss'
})
export class SeccionesListComponent implements OnInit{
  renderizarPor = this.cursoAperturadoSignal.renderizarPor;
  loading = true;
  openFormSecciones: boolean = false;
  seccionEdit: ListarSecciones
  listaSecciones = this.seccionSignal.listaSecciones;

  cursoAperturado = this.cursoAperturadoSignal.cursoAperturado
  secciones: ListarSecciones[] = []
  constructor(
    private authSignal: AuthSignal,
    private alertaService: AlertService,
    private modal: UiModalService,
    private seccionSignal: AperturaSeccionesSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private seccionRepository: AperturaSeccionRepository
  ){
  }
  displayedColumns: string[] = ['seccion', 'discapacidad', 'vacantes', 'observacion','nombre_formato','tipoAmbiente','n_grupos', 'action'];
  dataSource= new MatTableDataSource(this.secciones)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
    this.obtenerSecciones()
  }

  getNombreFormatoUnico = (seccion: ListarSecciones): string => {
    const formatos = seccion.ambiente.map((ambiente: any) => ambiente.nombreFormato);
    const formatosUnicos = [...new Set(formatos)]; // Elimina duplicados
    return formatosUnicos[0]; // Devuelve el primer nombre único
  }

  // Función para obtener la cantidad única de grupos
  // getCantidadGruposUnica = (seccion: ListarSecciones): number => {
  //   const grupos = seccion.ambiente.map((ambiente: any) => ambiente.cantidadGrupos);
  //   const gruposUnicos = [...new Set(grupos)]; // Elimina duplicados
  //   return gruposUnicos[0]; // Devuelve la primera cantidad única
  // }

  obtenerSecciones = () => {
    this.seccionRepository.obtenerSecciones(this.cursoAperturado().idAperturaCurso).subscribe({
      next: (secciones) => {
        this.dataSource.data = secciones;
        this.listaSecciones.set(secciones)
        console.log(secciones,'lista de secciones');
        this.loading = false
      }, error: (error) => {
        this.alertaService.sweetAlert('error')
      }
    })
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }

  limpiarDatosSeccion = () => {
    this.seccionEdit = {
      ambiente: [],
      detalleObservacion: '',
      discapacidad:false,
      idAperturaSeccion: 0,
      nombreSeccion: '',
      nVacantes:0
    };
  }


  agregarSeccion = (template: TemplateRef<any>) => {   
    this.modal.openTemplate({
      template,
      titulo: 'Agregar Seccion'
    }).afterClosed().subscribe(response => {
      if (response == 'cancelar') {
        console.log(response);
        return
      }
    });
  }

  openShowFormSeccion = ( event?: EventEmitter<string> | string, seccion?:ListarSecciones ) =>{
    switch(event){
      case 'Open' : {
        this.openFormSecciones = true;
        this.limpiarDatosSeccion()
      }break;

      case 'Cancelar' : {
        this.openFormSecciones = false;
        this.limpiarDatosSeccion()
      } break;

      case 'Add' : {
        console.log('Sección Creada');
        this.limpiarDatosSeccion()
        this.openFormSecciones = false;
        this.obtenerSecciones();
      } break;

      case 'Edit' : {
        console.log('editar');
        this.limpiarDatosSeccion()
        this.openFormSecciones = false;
        this.obtenerSecciones()
      }; break;

      case 'DeleteTipoAmbiente' : {
        console.log('DeleteTipoAmbiente');
        this.openFormSecciones = true;
        this.obtenerSecciones()       
      }; break;
    }
  }

  openShowFormEditSeccion = ( seccion:ListarSecciones,  event?: EventEmitter<string> | string ) =>{
    switch(event){
      case 'Open' : {
        this.openFormSecciones = true;
        this.seccionEdit = seccion;
        this.seccionSignal.setSeccionEdit(seccion)
      }break;
    }
  }

  eliminarSeccionConfirm = ( listarSeccion: ListarSecciones) => {
    const ultimaSeccion = this.listaSecciones()[this.listaSecciones().length - 1];
    if (listarSeccion.idAperturaSeccion !== ultimaSeccion.idAperturaSeccion) {
      this.alertaService.showAlert('Usted no podrá eliminar esta sección', 'error')
      return;
    }

        
    this.alertaService.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar la sección?')
    .then( isConfirm => {
      if(!isConfirm) return
      const eliminarSeccion : EliminarSeccion = {
        idAperturaSeccion: listarSeccion.idAperturaSeccion,
        idUsuario:parseInt( this.authSignal.currentRol().id )
      }
      this.eliminarSeccion(eliminarSeccion)
    })
  }
    eliminarSeccion = (seccionEliminar: EliminarSeccion) => {
    this.seccionRepository.eliminarSeccion(seccionEliminar).subscribe({
      next: (seccion) => {
        this.alertaService.sweetAlert('success', 'Correcto', 'La seccion se eliminó correctamente');
        this.obtenerSecciones();
        this.listaSecciones().length = this.cursoAperturado().nSecciones;
        this.renderizarPor.set('RenderizarCurso')
      }, error: ( error ) => {
        console.log(error);
        this.alertaService.sweetAlert('error', 'Error', 'Ocurrió un error al eliminar')
      }
    })
  }
}
