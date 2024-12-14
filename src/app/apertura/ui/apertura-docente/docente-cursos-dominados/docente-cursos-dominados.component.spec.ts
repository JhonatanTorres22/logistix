import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteCursosDominadosComponent } from './docente-cursos-dominados.component';

describe('DocenteCursosDominadosComponent', () => {
  let component: DocenteCursosDominadosComponent;
  let fixture: ComponentFixture<DocenteCursosDominadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteCursosDominadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteCursosDominadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
