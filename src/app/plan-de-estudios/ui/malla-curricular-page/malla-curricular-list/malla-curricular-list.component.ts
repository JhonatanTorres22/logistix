import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CicloPageComponent } from '../../ciclo-page/ciclo-page.component';
import { CursoPageComponent } from '../../curso-page/curso-page.component';

@Component({
  selector: 'malla-curricular-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, CicloPageComponent, CursoPageComponent ],
  templateUrl: './malla-curricular-list.component.html',
  styleUrl: './malla-curricular-list.component.scss'
})
export class MallaCurricularListComponent {

}
