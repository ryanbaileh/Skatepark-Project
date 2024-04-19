import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkateparkEditComponent } from './skatepark-edit.component';

describe('SkateparkEditComponent', () => {
  let component: SkateparkEditComponent;
  let fixture: ComponentFixture<SkateparkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkateparkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkateparkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
