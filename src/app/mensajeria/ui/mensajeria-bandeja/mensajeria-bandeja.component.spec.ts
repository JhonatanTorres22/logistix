import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaBandejaComponent } from './mensajeria-bandeja.component';

describe('MensajeriaBandejaComponent', () => {
  let component: MensajeriaBandejaComponent;
  let fixture: ComponentFixture<MensajeriaBandejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeriaBandejaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeriaBandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
