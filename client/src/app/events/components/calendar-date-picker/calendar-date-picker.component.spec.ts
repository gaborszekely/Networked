import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDatePickerComponent } from './calendar-date-picker.component';

describe('CalendarDatePickerComponent', () => {
  let component: CalendarDatePickerComponent;
  let fixture: ComponentFixture<CalendarDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
