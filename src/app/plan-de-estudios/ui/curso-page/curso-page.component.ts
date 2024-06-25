import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CursoListComponent } from './curso-list/curso-list.component';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';

@Component({
  selector: 'curso-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, CursoListComponent, UiButtonIconComponent ],
  templateUrl: './curso-page.component.html',
  styleUrl: './curso-page.component.scss'
})
export class CursoPageComponent {

}
