import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpottypeEditComponent } from './spottype-edit.component';

describe('SpottypeEditComponent', () => {
  let component: SpottypeEditComponent;
  let fixture: ComponentFixture<SpottypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpottypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpottypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
