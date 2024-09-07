import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaObservarComponent } from './mensajeria-observar.component';

describe('MensajeriaObservarComponent', () => {
  let component: MensajeriaObservarComponent;
  let fixture: ComponentFixture<MensajeriaObservarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaObservarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaObservarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
