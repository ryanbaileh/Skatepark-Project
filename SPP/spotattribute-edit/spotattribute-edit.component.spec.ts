import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotattributeEditComponent } from './spotattribute-edit.component';

describe('SpotattributeEditComponent', () => {
  let component: SpotattributeEditComponent;
  let fixture: ComponentFixture<SpotattributeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotattributeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotattributeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
