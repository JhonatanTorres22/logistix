import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaCardArchivedClosedApprovedComponent } from './mensajeria-card-archived-closed-approved.component';

describe('MensajeriaCardArchivedClosedApprovedComponent', () => {
  let component: MensajeriaCardArchivedClosedApprovedComponent;
  let fixture: ComponentFixture<MensajeriaCardArchivedClosedApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaCardArchivedClosedApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaCardArchivedClosedApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
