import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputFechaRangeComponent } from './ui-input-fecha-range.component';

describe('UiInputFechaRangeComponent', () => {
  let component: UiInputFechaRangeComponent;
  let fixture: ComponentFixture<UiInputFechaRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiInputFechaRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiInputFechaRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
