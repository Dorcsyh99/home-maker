import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertGetComponent } from './expert-get.component';

describe('ExpertGetComponent', () => {
  let component: ExpertGetComponent;
  let fixture: ComponentFixture<ExpertGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
