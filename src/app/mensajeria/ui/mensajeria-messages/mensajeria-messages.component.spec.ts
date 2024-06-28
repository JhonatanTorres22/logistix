import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaMessagesComponent } from './mensajeria-messages.component';

describe('MensajeriaMessagesComponent', () => {
  let component: MensajeriaMessagesComponent;
  let fixture: ComponentFixture<MensajeriaMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
