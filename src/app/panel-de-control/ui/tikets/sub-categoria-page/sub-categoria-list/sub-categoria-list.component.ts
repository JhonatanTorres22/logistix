import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SubCategoria, SubCategoriaEliminar, SubCategoriaListar } from 'src/app/panel-de-control/domain/models/subCategoria.model';
import { SubCategoriaRepository } from 'src/app/panel-de-control/domain/repositories/subCategoria.repository';
import { CategoriaSignal } from 'src/app/panel-de-control/domain/signals/categoria.signal';
import { SubCategoriaSignal } from 'src/app/panel-de-control/domain/signals/subCategoria.signal';

@Component({
  selector: 'sub-categoria-list',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    UiButtonComponent,
   ],
  templateUrl: './sub-categoria-list.component.html',
  styleUrl: './sub-categoria-list.component.scss'
})
export class SubCategoriaListComponent implements OnInit {

  subCategorias = this.signal.subCategorias;
  categoriaSelected = this.categoriaSignal.categoriaSelected;
  renderizarSubcategorias = this.signal.renderizarSubCategorias;
  showFormAddSubCategoria = this.signal.showFormAddSubCategoria;

  constructor(
    private repository: SubCategoriaRepository,
    private alert: AlertService,
    private signal: SubCategoriaSignal,
    private categoriaSignal: CategoriaSignal,

  ) {

    effect( () => {
      console.log( this.renderizarSubcategorias );
      switch( this.renderizarSubcategorias() ) {
        case 'Listar': { this.listar(); this.renderizarSubcategorias.set('') }; break;
      }
    }, { allowSignalWrites: true } )

  }
  ngOnInit(): void {
    this.listar()
  }

  listar = () => {
    this.repository.listar( this.categoriaSelected().id ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Listando sub categorias...', 'success', 4);
        this.subCategorias.set( response );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar las sub categorias', 'error', 4);
        
      }
    })
  }


  deleteConfirm = ( subCategoria: SubCategoria ) => {
    this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea eliminar la categoria ${ subCategoria.nombre }?`)
      .then( isConfirm => {
        if( !isConfirm ) return
        const categoriaDelete: SubCategoriaEliminar = {
          id: subCategoria.id
        }
        this.delete( categoriaDelete );
      })
  }

  delete = ( subCategoriaDelete: SubCategoriaEliminar ) => {
    this.repository.eliminar( subCategoriaDelete ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('La categoría se eliminó correctamente', 'success');
        this.renderizarSubcategorias.set('Listar')
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al eliminar la categoría', 'error');
        
      }
    })
  }

}
