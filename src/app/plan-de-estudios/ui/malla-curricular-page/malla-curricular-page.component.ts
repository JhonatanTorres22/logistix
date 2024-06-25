import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MallaCurricularListComponent } from './malla-curricular-list/malla-curricular-list.component';

@Component({
  selector: 'app-malla-curricular-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, MallaCurricularListComponent ],
  templateUrl: './malla-curricular-page.component.html',
  styleUrl: './malla-curricular-page.component.scss'
})
export class MallaCurricularPageComponent {

}
