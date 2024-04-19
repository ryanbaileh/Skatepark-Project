import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotstatusEditComponent } from './spotstatus-edit.component';

describe('SpotstatusEditComponent', () => {
  let component: SpotstatusEditComponent;
  let fixture: ComponentFixture<SpotstatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotstatusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotstatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
