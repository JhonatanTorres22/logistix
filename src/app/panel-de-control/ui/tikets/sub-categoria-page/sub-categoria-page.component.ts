import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'sub-categoria-page',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './sub-categoria-page.component.html',
  styleUrl: './sub-categoria-page.component.scss'
})
export class SubCategoriaPageComponent {

}
