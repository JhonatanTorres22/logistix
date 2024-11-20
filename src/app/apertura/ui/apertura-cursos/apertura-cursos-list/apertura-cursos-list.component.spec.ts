import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaCursosListComponent } from './apertura-cursos-list.component';

describe('AperturaCursosListComponent', () => {
  let component: AperturaCursosListComponent;
  let fixture: ComponentFixture<AperturaCursosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaCursosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AperturaCursosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
