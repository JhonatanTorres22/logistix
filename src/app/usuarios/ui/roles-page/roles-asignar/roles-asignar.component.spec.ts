import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAddComponent } from './roles-asignar.component';

describe('RolesAddComponent', () => {
  let component: RolesAddComponent;
  let fixture: ComponentFixture<RolesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
