import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotattributeListComponent } from './spotattribute-list.component';

describe('SpotattributeListComponent', () => {
  let component: SpotattributeListComponent;
  let fixture: ComponentFixture<SpotattributeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotattributeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotattributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
