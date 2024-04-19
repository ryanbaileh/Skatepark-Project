import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpottypeListComponent } from './spottype-list.component';

describe('SpottypeListComponent', () => {
  let component: SpottypeListComponent;
  let fixture: ComponentFixture<SpottypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpottypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpottypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
