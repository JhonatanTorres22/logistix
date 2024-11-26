import { CommonModule } from '@angular/common';
import { Component, effect, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocenteExcel } from 'src/app/apertura/domain/models/apertura-docente.model';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';
import { AperturaDocenteSignal } from 'src/app/apertura/domain/signal/apertura-docente.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { Rol } from 'src/app/roles/domain/models/rol.model';
import { RolRepository } from 'src/app/roles/domain/repositories/rol.repository';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { UsuariosRolDomainService } from 'src/app/usuarios/domain/services/usuarios-rol-domain.service';
import { UsuarioRolSignal } from 'src/app/usuarios/domain/signals/usuario-rol.signal';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-docente-import-template',
  standalone: true,
  imports: [UiUploaderFilesComponent, UiButtonComponent, SharedModule, CommonModule],
  templateUrl: './docente-import-template.component.html',
  styleUrl: './docente-import-template.component.scss'
})
export class DocenteImportTemplateComponent {
  roles = this.signalRol.roles;
  selectedRol = this.docenteSignal.selecteRol
  rows: DocenteExcel[] = []
  file = this.mensajeriaSignal.file;
  loadingImport = this.ambienteSignal.loadingImportAmbiente;
  docenteImportExcel = this.docenteSignal.docentesImportExcel

  displayedColumns: string[] = ['nombres', 'apellido_paterno', 'apellido_materno', 'documento', 'n_documento', 'sexo', 'fecha_nacimiento','correo_personal', 'correo_institucional', 'celular'];
  dataSource = new MatTableDataSource(this.rows);

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private signalRol: UsuarioRolSignal,
    private rolRepository: RolRepository,
    private docenteSignal : AperturaDocenteSignal,
    private mensajeriaSignal: MensajeriaSignal,
    private ambienteSignal: AperturaAmbienteSignal,
  ){
    effect(() => {

      this.obtenerRoles()
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
    this.file.set( this.ambienteSignal.fileDefault );
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
      const data = utils.sheet_to_json<DocenteExcel>(ws); // generate objects
  
      /* update data */
      // this.rows = data;
      this.docenteImportExcel.set(data);

      this.dataSource.data = this.docenteImportExcel();

      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })();
  }

  descargarPlantilla = () => {
    window.open('./assets/apertura/plantilla_docentes.xlsx');
  }

  obtenerRoles = () => {
    this.rolRepository.obtenerRoles().subscribe({
      next: (roles) => {

        this.roles.set( roles );

        
      }, error: ( error ) => {
        console.log(error);
        
      }
    })
  }

  seleccionarRol: Rol;

  // Método que maneja el evento selectionChange
  onRoleChange(event: MatSelectChange): void {
    // Obtenemos el rol completo (con id y nombre)
    const rolSeleccionado = this.roles().find(rol => rol.id === event.value)!;
    this.seleccionarRol = rolSeleccionado;
  }

}


