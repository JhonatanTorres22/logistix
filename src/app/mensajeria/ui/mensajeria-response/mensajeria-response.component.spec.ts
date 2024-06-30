import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaResponseComponent } from './mensajeria-response.component';

describe('MensajeriaResponseComponent', () => {
  let component: MensajeriaResponseComponent;
  let fixture: ComponentFixture<MensajeriaResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
