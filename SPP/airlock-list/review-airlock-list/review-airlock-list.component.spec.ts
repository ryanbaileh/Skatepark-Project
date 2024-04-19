import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAirlockListComponent } from './review-airlock-list.component';

describe('ReviewAirlockListComponent', () => {
  let component: ReviewAirlockListComponent;
  let fixture: ComponentFixture<ReviewAirlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAirlockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAirlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
