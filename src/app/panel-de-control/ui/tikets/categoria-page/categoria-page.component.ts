import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, TemplateRef } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Categoria, CategoriaEliminar } from 'src/app/panel-de-control/domain/models/categoria.model';
import { CategoriaRepository } from 'src/app/panel-de-control/domain/repositories/categoria.repository';
import { CategoriaSignal } from 'src/app/panel-de-control/domain/signals/categoria.signal';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { SubCategoriaAddComponent } from '../sub-categoria-page/sub-categoria-add/sub-categoria-add.component';
import { OpcionesFiltroComponent } from '../opciones-filtro/opciones-filtro.component';
import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { SubCategoriaRepository } from 'src/app/panel-de-control/domain/repositories/subCategoria.repository';
import { SubCategoriaListar } from 'src/app/panel-de-control/domain/models/subCategoria.model';

@Component({
  selector: 'categoria-page',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CategoriaAddComponent,
    SubCategoriaAddComponent,
    UiButtonComponent,

  ],
  templateUrl: './categoria-page.component.html',
  styleUrl: './categoria-page.component.scss'
})
export class CategoriaPageComponent implements OnInit {

  categorias = this.signal.categorias;
  categoriaEdit = this.signal.categoriaEdit;
  categoriaSelected = this.signal.categoriaSelected;
  renderizarCategorias = this.signal.renderizarCategorias;
  subcategorias: SubCategoriaListar[];

  constructor(
    private repository: CategoriaRepository,
    private SubCategoriaRepository: SubCategoriaRepository,
    private signal: CategoriaSignal,
    private alert: AlertService,
    private modal: UiModalService,

  ) {

    effect( () => {
      console.log( this.renderizarCategorias() );
      switch( this.renderizarCategorias() ) {
        case 'Listar': { this.obtenerCategorias(); this.renderizarCategorias.set('') }; break
      }
    }, { allowSignalWrites: true })

  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }


  obtenerCategorias = () => {
    this.repository.listarCategoria().subscribe({
      next: ( categorias ) => {
        console.log( categorias );
        this.categorias.set( categorias );

        this.alert.showAlert('Listando categorías...', 'success', 5);
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener las categorías', 'error', 5);
      }
    })
  }

  openModalCategoria = ( template: TemplateRef<any>, categoria?: Categoria) => {

    categoria ? this.categoriaEdit.set( categoria ) : ''

    this.modal.openTemplate({
      template: template,
      titulo: categoria ? 'Agregar Sub Categoria' : 'Agregar Categoria'
    }).afterClosed().subscribe( response => {
      console.log( response );
      if( response == 'cancelar') {
        this.categoriaEdit.set( this.signal.categoriaDefault );
        return
      }
      
    })
  }

  openModalSubCategoria = ( template: TemplateRef<any>, categoria: Categoria ) => {

    this.categoriaSelected.set( categoria );

    this.modal.openTemplate({
      template,
      titulo: ''
    }).afterClosed().subscribe( response => {
      console.log( response );
      if( response == 'cancelar') {
        this.categoriaSelected.set( this.signal.categoriaDefault );
        return
      }
      
    })
  }

  edit = ( categoria: Categoria ) => {

  }

  deleteConfirm = ( categoria: Categoria ) => {

    //OBTENER SUBCATEGORIAS

    this.listarSubCategorias( categoria.id ).then( esEliminable => {
      if( !esEliminable ) {
        this.alert.sweetAlert('info', 'ATENCIÓN', `No es posible eliminar la categoria: ${ categoria.nombre } debido a que tiene ${ this.subcategorias.length } sub ${ this.subcategorias.length == 1 ? 'categoría creada' : 'categorías creadas' }`)
        return
      }

      this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea eliminar la categoria ${ categoria.nombre }?`)
      .then( isConfirm => {
        if( !isConfirm ) return
        const categoriaDelete: CategoriaEliminar = {
          id: categoria.id
        }
        this.delete( categoriaDelete );
      });

    })

  }

  delete = ( categoriaDelete: CategoriaEliminar ) => {
    this.repository.eliminarCategoria( categoriaDelete ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('La categoría se eliminó correctamente', 'success');
        this.renderizarCategorias.set('Listar')
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar la categoría', 'error');
        
      }
    })
  }


  listarSubCategorias = ( categoriaId: number ) => {

    return new Promise<boolean>( ( resolve ) => {

      this.SubCategoriaRepository.listar( categoriaId ).subscribe({
        next: ( subCategorias ) => {
          console.log( subCategorias );
          // this.alert.showAlert('Listando sub categorias...', 'success', 4);
          // this.subCategorias.set( subCategorias );
          this.subcategorias = subCategorias;
          if( subCategorias.length == 0 ) {
            resolve( true )
            return
          }

          resolve( false )
        }, error: ( error ) => {
          console.log( error );
          this.alert.showAlert('Ocurrió un error a verificar si es posible eliminar', 'error', 4);
          
        }
      })

    });

    
  }

}
