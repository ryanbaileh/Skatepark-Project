import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotstatusListComponent } from './spotstatus-list.component';

describe('SpotstatusListComponent', () => {
  let component: SpotstatusListComponent;
  let fixture: ComponentFixture<SpotstatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotstatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotstatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
