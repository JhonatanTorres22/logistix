import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaObservacionComponent } from './mensajeria-observacion.component';

describe('MensajeriaObservacionComponent', () => {
  let component: MensajeriaObservacionComponent;
  let fixture: ComponentFixture<MensajeriaObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaObservacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
