import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreAcademicoPageComponent } from './semestre-academico-page.component';

describe('SemestreAcademicoPageComponent', () => {
  let component: SemestreAcademicoPageComponent;
  let fixture: ComponentFixture<SemestreAcademicoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreAcademicoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemestreAcademicoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
