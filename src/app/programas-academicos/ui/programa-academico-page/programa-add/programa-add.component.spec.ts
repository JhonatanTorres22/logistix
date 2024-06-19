import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaAcademicoAddComponent } from './programa-add.component';

describe('ProgramaAcademicoAddComponent', () => {
  let component: ProgramaAcademicoAddComponent;
  let fixture: ComponentFixture<ProgramaAcademicoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaAcademicoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaAcademicoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
