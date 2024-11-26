import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaAmbienteComponent } from './apertura-ambiente.component';

describe('AperturaAmbienteComponent', () => {
  let component: AperturaAmbienteComponent;
  let fixture: ComponentFixture<AperturaAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaAmbienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AperturaAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
