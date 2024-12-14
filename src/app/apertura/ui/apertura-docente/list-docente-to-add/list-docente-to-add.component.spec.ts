import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocenteToAddComponent } from './list-docente-to-add.component';

describe('ListDocenteToAddComponent', () => {
  let component: ListDocenteToAddComponent;
  let fixture: ComponentFixture<ListDocenteToAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDocenteToAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDocenteToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
