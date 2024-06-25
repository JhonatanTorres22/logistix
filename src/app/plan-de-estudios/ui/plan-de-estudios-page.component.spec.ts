import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeEstudiosPageComponent } from './plan-de-estudios-page.component';

describe('PlanDeEstudiosPageComponent', () => {
  let component: PlanDeEstudiosPageComponent;
  let fixture: ComponentFixture<PlanDeEstudiosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDeEstudiosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanDeEstudiosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
