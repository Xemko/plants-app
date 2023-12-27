import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../transloco/transloco-testing.module';

import { CalendarPage } from './calendar.page';

describe('CalendarPage', () => {
  let component: CalendarPage;
  let fixture: ComponentFixture<CalendarPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        getTranslocoTestingModule(),
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
