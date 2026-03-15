import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCategoryManagementComponent } from './material-category-management.component';

describe('MaterialCategoryManagementComponent', () => {
  let component: MaterialCategoryManagementComponent;
  let fixture: ComponentFixture<MaterialCategoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialCategoryManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
