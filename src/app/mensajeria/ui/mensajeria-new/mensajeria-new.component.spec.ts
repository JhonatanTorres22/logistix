import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaNewComponent } from './mensajeria-new.component';

describe('MensajeriaNewComponent', () => {
  let component: MensajeriaNewComponent;
  let fixture: ComponentFixture<MensajeriaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
