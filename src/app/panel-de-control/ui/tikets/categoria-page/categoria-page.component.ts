import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, TemplateRef } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Categoria, CategoriaEliminar } from 'src/app/panel-de-control/domain/models/categoria.model';
import { CategoriaRepository } from 'src/app/panel-de-control/domain/repositories/categoria.repository';
import { CategoriaSignal } from 'src/app/panel-de-control/domain/signals/categoria.signal';

@Component({
  selector: 'categoria-page',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
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

  constructor(
    private repository: CategoriaRepository,
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
    this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea eliminar la categoria ${ categoria.nombre }?`)
      .then( isConfirm => {
        if( !isConfirm ) return
        const categoriaDelete: CategoriaEliminar = {
          id: categoria.id
        }
        this.delete( categoriaDelete );
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

}
