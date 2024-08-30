import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPreRequisitoComponent } from './curso-pre-requisito.component';

describe('CursoPreRequisitoComponent', () => {
  let component: CursoPreRequisitoComponent;
  let fixture: ComponentFixture<CursoPreRequisitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoPreRequisitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoPreRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
