import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaCurricularSideComponent } from './malla-curricular-side.component';

describe('MallaCurricularSideComponent', () => {
  let component: MallaCurricularSideComponent;
  let fixture: ComponentFixture<MallaCurricularSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaCurricularSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MallaCurricularSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
