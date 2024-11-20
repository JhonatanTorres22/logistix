import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaSeccionesComponent } from './apertura-secciones.component';

describe('AperturaSeccionesComponent', () => {
  let component: AperturaSeccionesComponent;
  let fixture: ComponentFixture<AperturaSeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaSeccionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AperturaSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
