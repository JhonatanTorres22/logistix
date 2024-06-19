import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaAcademicoPageComponent } from './programa-page.component';

describe('ProgramaAcademicoPageComponent', () => {
  let component: ProgramaAcademicoPageComponent;
  let fixture: ComponentFixture<ProgramaAcademicoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaAcademicoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaAcademicoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
