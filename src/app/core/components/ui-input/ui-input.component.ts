import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, Self, EventEmitter } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss'
})
export class UiInputComponent implements ControlValueAccessor, OnInit{

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
  @Input() patternErrorMessage: string = ''
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
