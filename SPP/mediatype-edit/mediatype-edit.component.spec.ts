import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatypeEditComponent } from './mediatype-edit.component';

describe('MediatypeEditComponent', () => {
  let component: MediatypeEditComponent;
  let fixture: ComponentFixture<MediatypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediatypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediatypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
