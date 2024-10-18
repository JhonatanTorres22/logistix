import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CursoPlanEquivalencia } from 'src/app/plan-de-estudios/domain/models/curso-plan.model';
import { Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';

@Directive({
  selector: '[ColorCursoSecundario]',
  standalone: true
})
export class ColorCursoSecundarioDirective implements OnInit {

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

  @Input() curso: Malla;
  @Input() cursos: Malla[]

  constructor( private element: ElementRef ) {
    

  }

  
  ngOnInit(): void {
    // console.log( this.cursos);
    console.log( this.element.nativeElement );
    
    this.aplicarColor();
    
  }

  aplicarColor = () => {

    let colorMap: { [key: string]: string } = {};
    if (this.cursos?.length === 0) {
      return;
  }

  // Índice para recorrer la lista de colores
  let colorIndex = 0;

  // Iterar sobre los cursos
  this.cursos?.map((curso, index) => {

      // Si el código del curso ya tiene un color asignado, lo usa, si no, asigna uno nuevo
      if (!colorMap[curso.codigoCurso]) {
          colorMap[curso.codigoCurso] = this.colores[colorIndex];
          colorIndex = (colorIndex + 1) % this.colores.length;  // Incrementar el índice circularmente
      }

      if (curso.codigoCurso === this.curso.codigoCurso) {
          setTimeout(() => {
              const checkbox = document.querySelector(`#check-${curso.idMalla}`);
              this.element.nativeElement?.classList.remove('bg-white', 'text-black');
              
              // Aplicar el color del código asignado desde el mapa
              const colorAsignado = colorMap[curso.codigoCurso];
              this.element.nativeElement?.style.setProperty('background-color', colorAsignado);
              this.element.nativeElement?.classList.add('text-black');

              checkbox?.setAttribute('disabled', 'true');
              console.log(index + 1, ' - ', checkbox);
          }, 900);

      } else {
          if (curso.equivalencias?.length == 0) {
              this.element.nativeElement?.classList.add('bg-white', 'text-black');
              this.element.nativeElement?.style.setProperty('background-color', '#ffffff');
          }
      }
  });
  }

}
