import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInventoryComponent } from './container-inventory.component';

describe('ContainerInventoryComponent', () => {
  let component: ContainerInventoryComponent;
  let fixture: ComponentFixture<ContainerInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
