import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRestaurantComponent } from './choose-restaurant.component';

describe('ChooseRestaurantComponent', () => {
  let component: ChooseRestaurantComponent;
  let fixture: ComponentFixture<ChooseRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
