import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlockListComponent } from './airlock-list.component';

describe('AirlockListComponent', () => {
  let component: AirlockListComponent;
  let fixture: ComponentFixture<AirlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
