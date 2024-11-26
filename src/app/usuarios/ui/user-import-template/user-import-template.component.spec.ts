import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImportTemplateComponent } from './user-import-template.component';

describe('UserImportTemplateComponent', () => {
  let component: UserImportTemplateComponent;
  let fixture: ComponentFixture<UserImportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserImportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserImportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
