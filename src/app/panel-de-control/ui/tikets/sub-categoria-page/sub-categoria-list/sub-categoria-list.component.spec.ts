import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriaListComponent } from './sub-categoria-list.component';

describe('SubCategoriaListComponent', () => {
  let component: SubCategoriaListComponent;
  let fixture: ComponentFixture<SubCategoriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoriaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
