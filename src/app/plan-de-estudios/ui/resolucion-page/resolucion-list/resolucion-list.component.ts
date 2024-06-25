import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';

import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'resolucion-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonIconComponent ],
  templateUrl: './resolucion-list.component.html',
  styleUrl: './resolucion-list.component.scss'
})
export class ResolucionListComponent {

  constructor(
    private router: Router
  ) {}

  agregarMalla() {
    this.router.navigate(['plan-de-estudios/malla-curricular'])
  }

}
