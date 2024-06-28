import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaNoMessagesComponent } from './mensajeria-no-messages.component';

describe('MensajeriaNoMessagesComponent', () => {
  let component: MensajeriaNoMessagesComponent;
  let fixture: ComponentFixture<MensajeriaNoMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaNoMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaNoMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
