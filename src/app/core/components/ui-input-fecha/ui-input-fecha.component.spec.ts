import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputFechaComponent } from './ui-input-fecha.component';

describe('UiInputFechaComponent', () => {
  let component: UiInputFechaComponent;
  let fixture: ComponentFixture<UiInputFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiInputFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiInputFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
