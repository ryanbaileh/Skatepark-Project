import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotAirlockListComponent } from './spot-airlock-list.component';

describe('SpotAirlockListComponent', () => {
  let component: SpotAirlockListComponent;
  let fixture: ComponentFixture<SpotAirlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotAirlockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotAirlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
