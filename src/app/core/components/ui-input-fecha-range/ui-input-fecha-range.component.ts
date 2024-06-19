import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'aui-input-fecha-range',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ui-input-fecha-range.component.html',
  styleUrl: './ui-input-fecha-range.component.scss'
})
export class UiInputFechaRangeComponent implements ControlValueAccessor, OnInit{

  constructor(
    @Self() private ngControl: NgControl
  ) {
    if( ngControl ) {
      this.ngControl.valueAccessor = this
    }
  }
  
  @Input() label = '';
  // @Input() labelFin = '';
  @Input() type = '';
  @Input() readonlyInicio: boolean = false;
  @Input() readonlyFin: boolean = false;
  @Input() maxlength = 0;
  @Input() minlength = 0;
  formControlInicio!: FormControl;
  formControlFin!: FormControl;

  
  ngOnInit(): void {
    this.formControlInicio = this.ngControl.control as FormControl
    this.formControlFin = this.ngControl.control as FormControl

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
 
  
}