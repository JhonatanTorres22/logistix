import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RolesListComponent } from './roles-list/roles-list.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-roles-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, RolesListComponent],
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.scss'
})
export class RolesPageComponent {

}
