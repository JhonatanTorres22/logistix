import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaPageComponent } from './mensajeria-page.component';

describe('MensajeriaPageComponent', () => {
  let component: MensajeriaPageComponent;
  let fixture: ComponentFixture<MensajeriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
