import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaNavComponent } from './mensajeria-nav.component';

describe('MensajeriaNavComponent', () => {
  let component: MensajeriaNavComponent;
  let fixture: ComponentFixture<MensajeriaNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
