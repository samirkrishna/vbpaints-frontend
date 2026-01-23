import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialTableComponent } from './rawmaterial-table.component';

describe('RawmaterialTableComponent', () => {
  let component: RawmaterialTableComponent;
  let fixture: ComponentFixture<RawmaterialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawmaterialTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RawmaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
