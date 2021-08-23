import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierListCardComponent } from './supplier-list-card.component';

describe('SupplierListCardComponent', () => {
  let component: SupplierListCardComponent;
  let fixture: ComponentFixture<SupplierListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
