import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaCurricularAddComponent } from './malla-curricular-add.component';

describe('MallaCurricularAddComponent', () => {
  let component: MallaCurricularAddComponent;
  let fixture: ComponentFixture<MallaCurricularAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaCurricularAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MallaCurricularAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
