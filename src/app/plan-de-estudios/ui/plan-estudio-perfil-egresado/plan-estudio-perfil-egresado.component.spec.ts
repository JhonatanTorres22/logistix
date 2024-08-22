import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudioPerfilEgresadoComponent } from './plan-estudio-perfil-egresado.component';

describe('PlanEstudioPerfilEgresadoComponent', () => {
  let component: PlanEstudioPerfilEgresadoComponent;
  let fixture: ComponentFixture<PlanEstudioPerfilEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEstudioPerfilEgresadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEstudioPerfilEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
