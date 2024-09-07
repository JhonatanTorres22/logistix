import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';

import { IValidator } from 'src/app/panel-de-control/domain/models/categoria.model';

@Component({
  selector: 'ui-inputt',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './ui-inputt.component.html',
  styleUrl: './ui-inputt.component.scss'
})
export class UiInputtComponent  implements ControlValueAccessor, OnInit{

  constructor(
    @Self() private ngControl: NgControl
  ) {
    if( ngControl ) {
      this.ngControl.valueAccessor = this
    }
  }

  hide: boolean = true;
  @Output() onInputEvent: EventEmitter<string> = new EventEmitter();
  @Input() label = '';
  @Input() type = '';
  @Input() readonly: boolean = false;
  @Input() maxlength = 0;
  @Input() minlength = 0;
  @Input() expReg = '';
  @Input() duplicado: boolean = false;
  @Input() classInput: string = ''
  @Input() patternErrorMessage: string = '';
  @Input() min: number;
  @Input() validator: IValidator

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
    const formActual = this.formControl.value;
    // console.log( event.data );
    console.log(this.formControl.value);
    if( this.validator.expRegInput.test(this.formControl.value) ) {
      if( event.data == ' ' ) {
        return
      }
      console.log('Expre');
      console.log(formActual.substring(0, formActual.length - 1));
      
      this.formControl.patchValue( formActual.substring(0, formActual.length - 1) )
      console.log( formActual.length );

    }

  }

  trim = () => {
    this.formControl.patchValue( this.formControl.value.trim() );
  }

}
