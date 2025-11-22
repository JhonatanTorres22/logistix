import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCriteriosComponent } from './list-criterios.component';

describe('ListCriteriosComponent', () => {
  let component: ListCriteriosComponent;
  let fixture: ComponentFixture<ListCriteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCriteriosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
