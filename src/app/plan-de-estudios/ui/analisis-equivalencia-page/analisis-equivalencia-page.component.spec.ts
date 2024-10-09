import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisEquivalenciaPageComponent } from './analisis-equivalencia-page.component';

describe('AnalisisEquivalenciaPageComponent', () => {
  let component: AnalisisEquivalenciaPageComponent;
  let fixture: ComponentFixture<AnalisisEquivalenciaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisisEquivalenciaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalisisEquivalenciaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
