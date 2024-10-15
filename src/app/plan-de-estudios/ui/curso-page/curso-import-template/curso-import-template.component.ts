import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { CursoExcel } from 'src/app/plan-de-estudios/domain/models/curso.model';
import { CursoSignal } from 'src/app/plan-de-estudios/domain/signal/curso.signal';
import { MallaSignal } from 'src/app/plan-de-estudios/domain/signal/malla.signal';
import { read, utils } from 'xlsx';
import { PlanEstudioCardComponent } from '../../plan-estudio-card/plan-estudio-card.component';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';

@Component({
  selector: 'curso-import-template',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    UiButtonComponent,
    UiUploaderFilesComponent,
    PlanEstudioCardComponent,

  ],
  templateUrl: './curso-import-template.component.html',
  styleUrl: './curso-import-template.component.scss'
})
export class CursoImportTemplateComponent implements OnDestroy {

  rows: CursoExcel[] = [];
  // public props
  displayedColumns: string[] = ['ciclo', 'orden', 'codigo_curso', 'nombre_curso', 'ht', 'hp', 'th', 'creditos', 'tipo_curso', 'tipo_estudio', 'competencia', 'action'];
  dataSource = new MatTableDataSource(this.rows);

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  file = this.mensajeriaSignal.file;
  cursosImportExcel = this.signal.cursosImportExcel;
  loading = this.mallaSignal.loading;
  planEstudioUltimoConResolucion = this.planEstudioSignal.planEstudioUltimoConResolucion;
  constructor(
    private mensajeriaSignal: MensajeriaSignal,
    private signal: CursoSignal,
    private planEstudioSignal: PlanEstudioSignal,
    private mallaSignal: MallaSignal
  ) {

    effect(() => {

      console.log( this.file() );
      this.setFile();
      
    })

  } 
  ngOnDestroy(): void {
    this.file.set( this.mensajeriaSignal.fileDefault );
  }
  
  // table search filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }

  

  setFile = () => {
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
      const data = utils.sheet_to_json<CursoExcel>(ws); // generate objects
  
      /* update data */
      // this.rows = data;
      this.cursosImportExcel.set(data);

      this.dataSource.data = this.cursosImportExcel();

      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })();
  }

  descargarPlantilla = () => {
    window.open('./assets/plan-de-estudios/plantilla_plan_estudios.xlsx');
    // window.location.href = 'proyecto-academico.autonomadeica.edu.pe/plantilla_plan_estudios.xlsx';
  }

  validar = () => {
    console.log( this.dataSource.data );
    this.dataSource.data.map( curso => {

      // curso.ciclo

    } )
    
  }

}
