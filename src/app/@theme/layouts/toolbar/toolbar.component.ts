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

  constructor(
    private semestreRepository: SemestreAcademicoRepository,
    private semestreSignal: SemestreSignal,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.semestreRepository.obtenerSemestres().subscribe({
      next: ( semestres ) => {
        this.semestreSignal.setSemestresAcademicos( semestres );
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al listar los semestres', 'error', 6);
      }
    })
  }


}
