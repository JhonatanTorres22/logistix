import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'panel-de-control-page',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './panel-de-control-page.component.html',
  styleUrl: './panel-de-control-page.component.scss'
})
export class PanelDeControlPageComponent {

}
