import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaContentComponent } from './mensajeria-content.component';

describe('MensajeriaContentComponent', () => {
  let component: MensajeriaContentComponent;
  let fixture: ComponentFixture<MensajeriaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
