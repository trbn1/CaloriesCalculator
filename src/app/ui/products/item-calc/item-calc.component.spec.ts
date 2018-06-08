import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCalcComponent } from './item-calc.component';

describe('ItemCalcComponent', () => {
  let component: ItemCalcComponent;
  let fixture: ComponentFixture<ItemCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
