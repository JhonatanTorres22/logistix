import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'ui-button-icon',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './ui-button-icon.component.html',
  styleUrl: './ui-button-icon.component.scss'
})
export class UiButtonIconComponent {

  @Input() color: '';
  @Input() label: '';
  @Input() tooltip: '';
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Output() onClick = new EventEmitter();
}
