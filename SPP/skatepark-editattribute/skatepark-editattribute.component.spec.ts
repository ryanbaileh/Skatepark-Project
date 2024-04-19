import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkateparkEditAttributeComponent } from './skatepark-editattribute.component';

describe('SkateparkEditattributeComponent', () => {
  let component: SkateparkEditAttributeComponent;
  let fixture: ComponentFixture<SkateparkEditAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkateparkEditAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkateparkEditAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
