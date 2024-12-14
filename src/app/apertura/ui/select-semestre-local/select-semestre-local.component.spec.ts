import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSemestreLocalComponent } from './select-semestre-local.component';

describe('SelectSemestreLocalComponent', () => {
  let component: SelectSemestreLocalComponent;
  let fixture: ComponentFixture<SelectSemestreLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSemestreLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSemestreLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
