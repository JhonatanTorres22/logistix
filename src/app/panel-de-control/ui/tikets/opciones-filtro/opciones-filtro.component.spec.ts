import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesFiltroComponent } from './opciones-filtro.component';

describe('OpcionesFiltroComponent', () => {
  let component: OpcionesFiltroComponent;
  let fixture: ComponentFixture<OpcionesFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesFiltroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionesFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
