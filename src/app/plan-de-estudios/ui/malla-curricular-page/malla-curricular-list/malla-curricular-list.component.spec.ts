import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaCurricularListComponent } from './malla-curricular-list.component';

describe('MallaCurricularListComponent', () => {
  let component: MallaCurricularListComponent;
  let fixture: ComponentFixture<MallaCurricularListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaCurricularListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MallaCurricularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
