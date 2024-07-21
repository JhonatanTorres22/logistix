import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaFlujoNavegacionComponent } from './mensajeria-flujo-navegacion.component';

describe('MensajeriaFlujoNavegacionComponent', () => {
  let component: MensajeriaFlujoNavegacionComponent;
  let fixture: ComponentFixture<MensajeriaFlujoNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaFlujoNavegacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaFlujoNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
