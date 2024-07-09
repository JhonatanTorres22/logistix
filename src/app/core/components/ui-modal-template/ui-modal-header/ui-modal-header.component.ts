import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-modal-header',
  standalone: true,
  imports: [],
  templateUrl: './ui-modal-header.component.html',
  styleUrl: './ui-modal-header.component.scss'
})
export class UiModalHeaderComponent {

  @Input() title = '';

}
