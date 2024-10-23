import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEquivalenciaButtonsComponent } from './time-line-equivalencia-buttons.component';

describe('TimeLineEquivalenciaButtonsComponent', () => {
  let component: TimeLineEquivalenciaButtonsComponent;
  let fixture: ComponentFixture<TimeLineEquivalenciaButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLineEquivalenciaButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeLineEquivalenciaButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
