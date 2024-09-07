import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriaAddComponent } from './sub-categoria-add.component';

describe('SubCategoriaAddComponent', () => {
  let component: SubCategoriaAddComponent;
  let fixture: ComponentFixture<SubCategoriaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoriaAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategoriaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
