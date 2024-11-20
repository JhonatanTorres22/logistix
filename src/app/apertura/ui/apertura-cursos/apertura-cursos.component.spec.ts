import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaCursosComponent } from './apertura-cursos.component';

describe('AperturaCursosComponent', () => {
  let component: AperturaCursosComponent;
  let fixture: ComponentFixture<AperturaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AperturaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
