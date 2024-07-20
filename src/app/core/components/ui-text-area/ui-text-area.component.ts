import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'ui-text-area',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ui-text-area.component.html',
  styleUrl: './ui-text-area.component.scss'
})
export class UiTextAreaComponent implements ControlValueAccessor, OnInit{

  constructor(
    @Self() private ngControl: NgControl
  ) {
    if( ngControl ) {
      this.ngControl.valueAccessor = this
    }
  }

  hide: boolean = true;
  // @Output() onInput: EventEmitter<string> = new EventEmitter();
  @Input() label = '';
  @Input() type = '';
  @Input() readonly: boolean = false;
  @Input() maxlength = 0;
  @Input() minlength = 0;
  @Input() expReg = '';
  @Input() duplicado: boolean = false;
  @Input() classInput: string = ''
  @Input() patternErrorMessage: string = ''

  //@Input() classInput: string = '';
  // @Input() model: number


  formControl!: FormControl
  
  ngOnInit(): void {
    this.formControl = this.ngControl.control as FormControl;    
  }

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
 

  onInput( event: any ) {
    this.formControl.setValue(this.formControl.value.replace(this.expReg, ''));
  }
  
}
