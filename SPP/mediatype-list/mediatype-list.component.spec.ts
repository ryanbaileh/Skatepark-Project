import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatypeListComponent } from './mediatype-list.component';

describe('MediatypeListComponent', () => {
  let component: MediatypeListComponent;
  let fixture: ComponentFixture<MediatypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediatypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediatypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
