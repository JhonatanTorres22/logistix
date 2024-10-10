import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlanEquivalenciaComponent } from './select-plan-equivalencia.component';

describe('SelectPlanEquivalenciaComponent', () => {
  let component: SelectPlanEquivalenciaComponent;
  let fixture: ComponentFixture<SelectPlanEquivalenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlanEquivalenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPlanEquivalenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
