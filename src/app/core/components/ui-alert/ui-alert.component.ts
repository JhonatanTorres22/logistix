import { Component, Input, input, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert.interface';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [],
  templateUrl: './ui-alert.component.html',
  styleUrl: './ui-alert.component.scss'
})
export class UiAlertComponent implements OnInit {

  @Input() type: AlertType;
  // @Input() message: string = '';
  color: string = '';
  title: string = ''
  constructor() {
    
  }
  ngOnInit(): void {
    switch (this.type) {
      case 'info': { this.color = 'cyan'; this.title = 'Información: '; break; };
      case 'success': { this.color = 'green'; this.title = 'Enhorabuena: '; break; };
      case 'warning': { this.color = 'warning'; this.title = 'Atención: '; break; };
      case 'danger': { this.color = 'danger'; this.title = 'Error: '; break; };
      default: { this.color = 'primary'; this.title = 'Atención: '; break; }
    }
  }


}
