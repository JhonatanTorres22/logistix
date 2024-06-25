import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {

  @Input() color: '';
  @Input() label: '';
  @Input() disabled: boolean = false;
  @Input() icon: string;

}
