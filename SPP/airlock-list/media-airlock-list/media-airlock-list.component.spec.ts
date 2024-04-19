import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAirlockListComponent } from './media-airlock-list.component';

describe('MediaAirlockListComponent', () => {
  let component: MediaAirlockListComponent;
  let fixture: ComponentFixture<MediaAirlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaAirlockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaAirlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
