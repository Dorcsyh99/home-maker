import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGetComponent } from './home-get.component';

describe('HomeGetComponent', () => {
  let component: HomeGetComponent;
  let fixture: ComponentFixture<HomeGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
