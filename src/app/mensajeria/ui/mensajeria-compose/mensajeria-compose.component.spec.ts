import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaComposeComponent } from './mensajeria-compose.component';

describe('MensajeriaComposeComponent', () => {
  let component: MensajeriaComposeComponent;
  let fixture: ComponentFixture<MensajeriaComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaComposeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
