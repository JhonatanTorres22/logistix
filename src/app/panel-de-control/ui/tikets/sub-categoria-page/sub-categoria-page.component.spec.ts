import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriaPageComponent } from './sub-categoria-page.component';

describe('SubCategoriaPageComponent', () => {
  let component: SubCategoriaPageComponent;
  let fixture: ComponentFixture<SubCategoriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoriaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategoriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
