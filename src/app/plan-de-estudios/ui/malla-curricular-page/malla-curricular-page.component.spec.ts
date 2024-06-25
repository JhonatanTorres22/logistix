import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaCurricularPageComponent } from './malla-curricular-page.component';

describe('MallaCurricularPageComponent', () => {
  let component: MallaCurricularPageComponent;
  let fixture: ComponentFixture<MallaCurricularPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaCurricularPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MallaCurricularPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
