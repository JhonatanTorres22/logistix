import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaCursosAddComponent } from './apertura-cursos-add.component';

describe('AperturaCursosAddComponent', () => {
  let component: AperturaCursosAddComponent;
  let fixture: ComponentFixture<AperturaCursosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaCursosAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AperturaCursosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
