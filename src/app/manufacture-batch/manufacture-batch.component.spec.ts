import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureBatchComponent } from './manufacture-batch.component';

describe('ManufactureBatchComponent', () => {
  let component: ManufactureBatchComponent;
  let fixture: ComponentFixture<ManufactureBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufactureBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManufactureBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
