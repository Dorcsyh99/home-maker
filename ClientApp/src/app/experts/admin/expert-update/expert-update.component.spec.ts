import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertUpdateComponent } from './expert-update.component';

describe('ExpertUpdateComponent', () => {
  let component: ExpertUpdateComponent;
  let fixture: ComponentFixture<ExpertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
