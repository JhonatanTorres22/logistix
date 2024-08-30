import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[HoverClass]',
  standalone: true
})
export class HoverClassDirective implements OnInit {

  @Input() idButton: number

  constructor(private element: ElementRef ) { }
  ngOnInit(): void {
    console.log( this.element.nativeElement );
    this.aplicarClass()
  }

  aplicarClass = () => {
    this.element.nativeElement.addEventListener("mouseover", () => {
      console.log('focus');
      const cursos = this.element.nativeElement;

      Array.from( cursos ).forEach( ( curso ) => {
        console.log( curso );
        
      })
    }, false)
  }

}
