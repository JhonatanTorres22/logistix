import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListarAmbientes } from 'src/app/apertura/domain/models/apertura-ambiente.model';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';

import { read, utils } from 'xlsx';

@Component({
  selector: 'app-ambiente-import-template',
  standalone: true,
  imports: [UiUploaderFilesComponent, CommonModule, SharedModule,
    UiButtonComponent, UiLoadingProgressBarComponent,
  ],
  templateUrl: './ambiente-import-template.component.html',
  styleUrl: './ambiente-import-template.component.scss'
})
export class AmbienteImportTemplateComponent {
  loadingImport = this.ambienteSignal.loadingImportAmbiente;
  rows: ListarAmbientes[] = [];
  file = this.mensajeriaSignal.file;
  cursosImportExcel = this.ambienteSignal.cursosImportExcel;
  displayedColumns: string[] = ['nombreAmbiente', 'pabellon','nivel','tipoAmbiente', 'aforo', 'discapacidad','action'];
  dataSource = new MatTableDataSource(this.rows);
  listarAmbienteAnterior = this.ambienteSignal.listarAmbienteAnterior
  
  constructor(
    private mensajeriaSignal: MensajeriaSignal,
    private ambienteSignal: AperturaAmbienteSignal,
  ){ 
    effect(() => {

      console.log( this.file() );
      this.setFile();
      
    })

  }

  ngOnDestroy(): void {
    this.file.set( this.ambienteSignal.fileDefault );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }

  setFile = () => {
    if(this.listarAmbienteAnterior().length == 0){
      
      if( this.file().files.length == 0 ) {
        return
      }
      ( async() => {   
        const file = await this.file().files[0].arrayBuffer();

        /* parse workbook */
        // const wb = read(ab);
        const wb = read(file);
        /* generate array of objects from first worksheet */
        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const data = utils.sheet_to_json<ListarAmbientes>(ws); // generate objects
        this.cursosImportExcel.set(data);
          this.dataSource.data = this.cursosImportExcel();
          console.log(this.dataSource.data,'**');
          
      })();
    }
    else {     
      this.dataSource.data = this.listarAmbienteAnterior()
    }
  }

  descargarPlantilla = () => {
    window.open('./assets/apertura/plantilla_ambientes.xlsx');
  }
  
}
