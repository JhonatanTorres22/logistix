import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MallaCurricularListComponent } from './malla-curricular-list/malla-curricular-list.component';
import { MallaListComponent } from './malla-list/malla-list.component';

@Component({
  selector: 'app-malla-curricular-page',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    MallaCurricularListComponent,
    MallaListComponent
  ],
  templateUrl: './malla-curricular-page.component.html',
  styleUrl: './malla-curricular-page.component.scss'
})
export class MallaCurricularPageComponent {

}
