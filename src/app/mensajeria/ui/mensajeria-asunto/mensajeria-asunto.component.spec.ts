import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaAsuntoComponent } from './mensajeria-asunto.component';

describe('MensajeriaAsuntoComponent', () => {
  let component: MensajeriaAsuntoComponent;
  let fixture: ComponentFixture<MensajeriaAsuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaAsuntoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaAsuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
