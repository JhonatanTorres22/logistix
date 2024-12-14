import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EliminarAmbiente, InsertarAmbiente, ListarAmbientes } from 'src/app/apertura/domain/models/apertura-ambiente.model';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AmbienteImportTemplateComponent } from '../ambiente-import-template/ambiente-import-template.component';
import { AperturaAmbienteRepository } from 'src/app/apertura/domain/repositories/apertura-ambiente.repository';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { AmbienteAddComponent } from '../ambiente-add/ambiente-add.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { template } from 'lodash';
import { ExportPdfAmbienteComponent } from '../export-pdf-ambiente/export-pdf-ambiente.component';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'list-ambiente',
  standalone: true,
  imports: [SharedModule, UiLoadingProgressBarComponent, AmbienteAddComponent,
    AmbienteImportTemplateComponent, ExportPdfAmbienteComponent,
    UiButtonComponent,
    CommonModule],
  templateUrl: './list-ambiente.component.html',
  styleUrl: './list-ambiente.component.scss'
})
export class ListAmbienteComponent implements OnInit {
  renderizar = this.ambienteSignal.renderizarPor
  loadingImport = this.ambienteSignal.loadingImportAmbiente;
  cursosImportExcel = this.ambienteSignal.cursosImportExcel;
  listarAmbiente = this.ambienteSignal.listarAmbientes;
  listarAmbienteAnterior = this.ambienteSignal.listarAmbienteAnterior
  ambienteSelected = this.ambienteSignal.ambienteSelected
  displayedColumns: string[] = ['nombre', 'pabellon', 'nivel', 'tipoAmbiente', 'aforo', 'discapacidad', 'action'];
  ambientes: ListarAmbientes[] = []
  selectSemestreLocal = this.cursoAperturadoSignal.selectSemestreLocal
  dataSourceAmbiente = new MatTableDataSource(this.ambientes)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('templateAmbienteImport', { static: false }) templateAmbienteImport: TemplateRef<any>;

  file = this.mensajeriaSignal.file;

  /* filtro */
  filterForm: FormGroup;
  tiposDeAmbiente: string[] = [];
  pabellones: string[] = [];
  niveles: number[] = [];

  
  constructor(
    private fb: FormBuilder,
    private authSignal: AuthSignal,
    private mensajeriaSignal: MensajeriaSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private repository: AperturaAmbienteRepository,
    private modal: UiModalService,
    private ambienteSignal: AperturaAmbienteSignal,
    private alertService: AlertService,
  ) {
    effect(() => {

      if (this.renderizar() == 'Renderizar') {
        this.obtenerAmbientes();

         // Suscribirse a cambios en el formulario
         this.filterForm.valueChanges.subscribe(() => this.applyFilters());

         
      }
      this.renderizar.set('')
    }, { allowSignalWrites: true })

    this.filterForm = this.fb.group({
      discapacidad: [],
      tipoDeAmbiente: [],
      nombrePabellon: [],
      nivelAmbiente: [],
  });
}

ngOnInit(): void {
  this.applyFilters()
  // this.obtenerAmbientes()
  }

  applyFilters() {
    const { discapacidad, tipoDeAmbiente, nombrePabellon, nivelAmbiente } = this.filterForm.value;
    this.dataSourceAmbiente.data = this.listarAmbiente().filter(ambiente => {
      
        return (
            (discapacidad === null || ambiente.discapacidad === discapacidad) &&
            (tipoDeAmbiente === null || ambiente.tipoDeAmbiente === tipoDeAmbiente) &&
            (nombrePabellon === null || ambiente.nombrePabellon === nombrePabellon) &&
            (nivelAmbiente === null || ambiente.nivelAmbiente === nivelAmbiente)
        );
      });
      // this.listarAmbiente.set(this.dataSourceAmbiente.data)
}

  obtenerAmbientes = () => {
    this.loadingImport.set(true);
    return new Promise<boolean>(resolve => {
      this.repository.obtenerAmbientexSemestre(this.selectSemestreLocal().idSemestre, this.selectSemestreLocal().codigoLocal).subscribe({
        next: (ambiente) => {
          this.dataSourceAmbiente.data = ambiente
          this.listarAmbiente.set(ambiente)
          this.loadingImport.set(false);
          this.listarAmbienteAnterior.set(this.ambienteSignal.listaAmbienteAnteriorDefault)
          this.alertService.showAlert('Ambientes listados correctamente', 'success')

          if(ambiente.length> 0){
            this.tiposDeAmbiente = [...new Set(ambiente.map((a) => a.tipoDeAmbiente))];
             this.pabellones = [...new Set(ambiente.map((a) => a.nombrePabellon))];
             this.niveles = [...new Set(ambiente.map((a) => a.nivelAmbiente))];
          }

          if (ambiente.length == 0) {
            this.loadingImport.set(true);
            this.obtenerAmbientesAnterior()
          }
          resolve(true)
        }, error: (error) => {
          this.alertService.showAlert('Ocurrió un error al listar los ambientes...', 'error');
          resolve(false);
        }
      })
    })
  }

  obtenerAmbientesAnterior = () => {
    this.repository.obtenerAmbiente(this.selectSemestreLocal().codigoLocal).subscribe({
      next: (ambiente) => {
        this.listarAmbienteAnterior.set(ambiente);
        this.alertService.showAlert('Listando ambientes del semestre anterior', 'success');

        this.modalImportarAmbiente(this.templateAmbienteImport)
        this.loadingImport.set(false);
      }, error: (error) => {
        this.alertService.showAlert('Ocurrió un error al listar los ambientes...', 'error');
        this.loadingImport.set(false);
      }
    })
  }

  modalImportarAmbiente = (template: TemplateRef<any>) => {
    this.modal.openTemplate({
      template,
      titulo: 'Importar Ambientes',
    }).afterClosed().subscribe(data => {
      if (data === 'cancelar') {
        return
      }
    })
  }

  modalAddAmbiente = (template: TemplateRef<any>, action: string, ambiente: ListarAmbientes) => {
    // const ambiente = action == 'Editar' ? this.ambienteSelected() : this.ambienteSignal.ambienteDefault;
    const ambienteSeleccionado: ListarAmbientes = {
      idAmbiente: ambiente.idAmbiente,
      nombreAmbiente: ambiente.nombreAmbiente,
      nombrePabellon: ambiente.nombrePabellon,
      nivelAmbiente: ambiente.nivelAmbiente,
      aforo: ambiente.aforo,
      discapacidad: ambiente.discapacidad,
      local: ambiente.local,
      tipoDeAmbiente: ambiente.tipoDeAmbiente
    }
    this.ambienteSelected.set(ambienteSeleccionado);
    let title = ambienteSeleccionado.idAmbiente == 0 ? 'Crear Ambiente' : 'Editar Ambiente'
    this.modal.openTemplate({
      template,
      titulo: title,
    }).afterClosed().subscribe(data => {
      if (data === 'cancelar') {
        this.ambienteSelected.set(this.ambienteSignal.ambienteDefault)
        return
      }
    })
  }

  guardarCursosImport = () => {
    const tipoAmbienteMap: { [key: string]: number } = {
      "Aula": 1,
        "Laboratorio": 2,
        "Aula Hibrida": 3,
        "Taller": 4,
        "Zoom": 5
    };
    this.loadingImport.set(true);
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea guardar los ambientes importados?')
      .then(isConfirm => {
        if (!isConfirm) {
          this.loadingImport.set(false);
          return;
        }

        const ambientes: InsertarAmbiente[] = (this.listarAmbienteAnterior().length > 0 ? this.listarAmbienteAnterior() : this.cursosImportExcel()).map(ambiente => {
          const tipoAmbienteTexto = ambiente.tipoDeAmbiente as keyof typeof tipoAmbienteMap;
          const idTipoAmbiente = tipoAmbienteMap[tipoAmbienteTexto];

          return {
            idSemestre: this.selectSemestreLocal().idSemestre,
            idLocal: this.selectSemestreLocal().codigoLocal,
            idTipoAmbiente: idTipoAmbiente,
            nombreAmbiente: ambiente.nombreAmbiente,
            nombrePabellon: ambiente.nombrePabellon,
            nivelAmbiente: ambiente.nivelAmbiente,
            aforo: ambiente.aforo,
            discapacidad: (typeof ambiente.discapacidad === 'string')
              ? ambiente.discapacidad === ('SI') // Convertir 'si' a true y 'no' a false
              : ambiente.discapacidad, // Si ya es booleano, lo dejamos tal cual
            idUsuario: parseInt(this.authSignal.currentRol().id)
          }
        });

        this.validarTipoAmbiente().then(isValid => {
          if (!isValid) {
            return
          }
          setTimeout(() => {
            this.insertarAmbienteMasivo(ambientes).then(isInsert => {
              if (!isInsert) {
                this.loadingImport.set(false);
                return;
              }
            })
          }, 500);
        })
      })
  }
  validarTipoAmbiente = () => {
    return new Promise<boolean>(resolve => {
      // Mapeo de los valores de tipoAmbiente
      const tipoAmbienteMap = {
        "Aula": 1,
        "Laboratorio": 2,
        "Aula Hibrida": 3,
        "Taller": 4,
        "Zoom": 5
      };
  
      // Iteramos sobre todos los ambientes recibidos
      const ambientes = this.cursosImportExcel();
  
      for (const ambiente of ambientes) {
        const tipoAmbienteTexto = String(ambiente.tipoDeAmbiente).trim();  // Normalizamos a mayúsculas

        // Validación del tipo de ambiente
        if (!(tipoAmbienteTexto in tipoAmbienteMap)) {
          this.alertService.showAlert('Hay problemas de validación con el tipo de ambiente', 'error');
          resolve(false);
          this.loadingImport.set(false);
          return;  // Termina la función si el valor no es válido
        }
        // Validación del aforo (no puede ser 0)
        if (ambiente.aforo === 0) {
          this.alertService.showAlert(`El aforo del ambiente "${ambiente.nombreAmbiente}" no puede ser 0.`, 'error');
          resolve(false);
          this.loadingImport.set(false);
          return;  // Termina la función si el aforo es 0
        }
      }
  
      // Si todas las validaciones pasan
      resolve(true);
    });
  };
  

  insertarAmbienteMasivo = (ambiente: InsertarAmbiente[]) => {
    return new Promise<boolean>(resolve => {

      this.repository.insertarAmbiente(ambiente).subscribe({
        next: (data) => {
          this.alertService.showAlert('Los ambientes fueron guardados correctamente', 'success', 6);
          this.listarAmbienteAnterior.set(this.ambienteSignal.listaAmbienteAnteriorDefault)
          this.file.set(this.mensajeriaSignal.fileDefault);
          this.loadingImport.set(false);

          this.modal.getRefModal()?.close('Obtener');
          this.obtenerAmbientes().then(response => {
            if (!response) {
              resolve(false);
              return
            }

            resolve(true)
          })
        }, error: (error) => {
          resolve(false);
          this.alertService.showAlert('Ocurrió un error al guardar los ambientes', 'error', 6);
        }
      })
    })
  }




  eliminarAmbienteConfirm = (ambienteOAmbientes: ListarAmbientes | ListarAmbientes[]) => {
    const eliminarAmbiente: EliminarAmbiente[] = [];

    const ambientes = Array.isArray(ambienteOAmbientes) ? ambienteOAmbientes  : [ambienteOAmbientes];

    // Recorre los ambientes para construir el array de eliminación
    const idUsuario = parseInt(this.authSignal.currentRol().id);
    ambientes.forEach(ambiente => {
      eliminarAmbiente.push({
        idAmbiente: ambiente.idAmbiente,
        idUsuario: idUsuario
      });
    });

    this.alertService.sweetAlert('question', '¿Confirmar?', '¿Desea eliminar los ambientes seleccionados?')
      .then(isConfirm => {
        if (!isConfirm) return;
        this.loadingImport.set(true);
        this.eliminarAmbientes(eliminarAmbiente);
      });
  }

  eliminarAmbientes = (eliminarAmbiente: EliminarAmbiente[]) => {
    this.repository.eliminarAmbiente(eliminarAmbiente).subscribe({
      next: () => {
        this.alertService.showAlert('Ambiente eliminado correctamente', 'success');
        this.obtenerAmbientes();
        this.loadingImport.set(false);
      }, error: (error) => {
        this.alertService.showAlert('Ocurrió un error al eliminar los ambientes...', 'error');
        this.loadingImport.set(false);

      }
    })
  }
}
