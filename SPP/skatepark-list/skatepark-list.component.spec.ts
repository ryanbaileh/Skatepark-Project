import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkateparkListComponent } from './skatepark-list.component';

describe('SkateparkListComponent', () => {
  let component: SkateparkListComponent;
  let fixture: ComponentFixture<SkateparkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkateparkListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkateparkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
