import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';

@Directive({
  selector: '[ColorCursoEquivalente]',
  standalone: true
})


export class ColorCursoEquivalenteDirective implements OnInit {

  @Input() curso: Malla
  @Input() connectionsColor: { leftCardId: number, rightCardId: number }[] = [];

  colores = [
    "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
    "#FFB3E6", "#FFABAB", "#FFC3A0", "#FF677D", "#D5AAFF",
    "#A0E7E5", "#C3E8F2", "#FFBCBC", "#FFD3B6", "#FFDD93",
    "#B9FBC0", "#C2B2FF", "#FFC9FF", "#FFB4D8", "#B4E7E3",
    "#FFE1A8", "#FFDAA2", "#A5E1AD", "#D8C4E2", "#D9B4FF",
    "#EAD1DC", "#B2E7E2", "#FFF5BA", "#B4B9FF", "#D7F9A3",
    "#FFEBB7", "#FFE5E2", "#D7E1D5", "#F9E3E0", "#F2C6D4",
    "#E3B7B2", "#A4D4FF", "#F9F5C5", "#FFD6E6", "#B9D8D4",
    "#FFDAC1", "#FFE8D6", "#A6E1F9", "#D7D3C2", "#C3C6FF",
    "#FFC4D6", "#E0B2B2", "#B8E0D2", "#F6E7D7", "#E5B0D6",
    "#D4E09B", "#FCEBAF", "#E5D0D0", "#C5E1A5", "#F1C2D7",
    "#D7B2A4", "#F0E7B0", "#F0C1D1", "#F3D1D1", "#D2F0E7",
    "#F4E7C5", "#E1B8B8", "#F2C8A2", "#B3CDE0", "#F9F1D9"
  ];

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.assingColor()
      console.log( this.connectionsColor );
    }, 2000);
    
  }


  assingColor = () => {
    const colorAsign = this.getColor( this.curso.idMalla );
    const iconAsign = this.getIcon( this.curso.idMalla );
    // this.element.nativeElement?.style.setProperty('background-color', colorAsign);

    this.renderer.setStyle( this.element.nativeElement, 'background-color', colorAsign)
    const icono = document.querySelector('#icon-' + this.curso.idMalla);
    console.log( icono );
    
    this.renderer.setAttribute( icono, 'class', iconAsign)
  }

  getColor(idMalla: number): string {  
    const index = this.connectionsColor.findIndex(convalidacion => 
      (convalidacion.leftCardId === idMalla) || (convalidacion.rightCardId === idMalla )
    );
    return index !== -1 ? this.colores[index % this.colores.length] : 'transparent';
  }

  getIcon( idMalla: number): string {
    const index = this.connectionsColor.findIndex( equivalencia => 
     ( equivalencia.leftCardId == idMalla ) || (equivalencia.rightCardId == idMalla )
    )
    // const icono = this.curso.equivalencias.length == 0 ? 'ti ti-clock' : 'ti ti-check'
    // return index !== -1 ? icono + ' f-20 text-white border-circle' : icono + ' f-20 text-white border-circle';
    return index !== -1 ? 'ti ti-check f-20 text-white border-circle' : 'ti ti-clock f-20 text-white border-circle';
  }


}
