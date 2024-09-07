import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaEstadoComponent } from './mensajeria-estado.component';

describe('MensajeriaEstadoComponent', () => {
  let component: MensajeriaEstadoComponent;
  let fixture: ComponentFixture<MensajeriaEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
