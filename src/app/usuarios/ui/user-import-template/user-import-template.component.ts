import { CommonModule } from '@angular/common';
import { Component, effect, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { UserImportExcel } from '../../domain/models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioSignal } from '../../domain/signals/usuario.signal';
import { read, utils } from 'xlsx';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';

@Component({
  selector: 'app-user-import-template',
  standalone: true,
  imports: [UiUploaderFilesComponent, CommonModule,UiLoadingProgressBarComponent, SharedModule, UiButtonComponent],
  templateUrl: './user-import-template.component.html',
  styleUrl: './user-import-template.component.scss'
})
export class UserImportTemplateComponent {
  rows: UserImportExcel[] = []
  file = this.mensajeriaSignal.file;
  loadingImportUser = this.usuarioSignal.loadingImportUser
  displayedColumns: string[] = ['nombres', 'apellido_paterno', 'apellido_materno', 'documento', 'n_documento', 'sexo', 'fecha_nacimiento','correo_personal', 'correo_institucional', 'celular'];
  dataSource = new MatTableDataSource(this.rows);
  userImportExcel = this.usuarioSignal.userImportExcel
  // loadingImport = this.ambienteSignal.loadingImportAmbiente;

    // paginator
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  constructor(
    private usuarioSignal: UsuarioSignal,
    private mensajeriaSignal: MensajeriaSignal,
  ){
    effect(() => {

      // this.obtenerRoles()
      console.log( this.file() );
      this.setFile();
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.file.set( this.mensajeriaSignal.fileDefault );
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
      const data = utils.sheet_to_json<UserImportExcel>(ws); // generate objects
  
      /* update data */
      // this.rows = data;
      this.userImportExcel.set(data);

      this.dataSource.data = this.userImportExcel();

      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })();
  }

  descargarPlantilla = () => {
    window.open('./assets/apertura/plantilla_docentes.xlsx');
  }
}
