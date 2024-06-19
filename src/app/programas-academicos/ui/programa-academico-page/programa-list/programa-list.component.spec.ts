import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaAcademicoListComponent } from './programa-list.component';

describe('ProgramaAcademicoListComponent', () => {
  let component: ProgramaAcademicoListComponent;
  let fixture: ComponentFixture<ProgramaAcademicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaAcademicoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaAcademicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
