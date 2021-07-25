import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAllComponent } from './expert-all.component';

describe('ExpertAllComponent', () => {
  let component: ExpertAllComponent;
  let fixture: ComponentFixture<ExpertAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
