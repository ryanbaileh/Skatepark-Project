import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkateparkViewComponent } from './skatepark-view.component';

describe('SkateparkViewComponent', () => {
  let component: SkateparkViewComponent;
  let fixture: ComponentFixture<SkateparkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkateparkViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkateparkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
