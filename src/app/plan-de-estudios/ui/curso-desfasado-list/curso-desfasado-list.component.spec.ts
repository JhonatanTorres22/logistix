import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDesfasadoListComponent } from './curso-desfasado-list.component';

describe('CursoDesfasadoListComponent', () => {
  let component: CursoDesfasadoListComponent;
  let fixture: ComponentFixture<CursoDesfasadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoDesfasadoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoDesfasadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
