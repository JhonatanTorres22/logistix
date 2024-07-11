import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent implements OnInit {


  @Input() color: string = 'secondary';
  @Input() label: '';
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() classButton: string = '';
  @Input() borde: string = 'none';
  @Input() type: 'sweet' | 'default' = 'default';

  @Output() onClick = new EventEmitter();

  ngOnInit(): void {
    // this.tooltip = this.label;
    this.type = this.type ? this.type : 'default'; 
  }


  

  
}
