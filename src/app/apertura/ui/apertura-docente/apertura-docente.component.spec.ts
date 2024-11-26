import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaDocenteComponent } from './apertura-docente.component';

describe('AperturaDocenteComponent', () => {
  let component: AperturaDocenteComponent;
  let fixture: ComponentFixture<AperturaDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AperturaDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
