import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appRemoveHtml]',
  standalone: true
})
export class RemoveHtmlDirective {

  //  @Input() removeHTML: string = '';
  // expRegHTML: RegExp =  /(<([^>]+)>)/ig
  // constructor() {
    
  // }

  // ngOnInit() {
  //   console.log(this.removeHTML);

  //   this. removeHTML = this.removeHTML.replace( this.expRegHTML, this.removeHTML )
  //   console.log(this.removeHTML);

  // }

}
