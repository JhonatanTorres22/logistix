import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaTimeLineComponent } from './mensajeria-time-line.component';

describe('MensajeriaTimeLineComponent', () => {
  let component: MensajeriaTimeLineComponent;
  let fixture: ComponentFixture<MensajeriaTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaTimeLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
