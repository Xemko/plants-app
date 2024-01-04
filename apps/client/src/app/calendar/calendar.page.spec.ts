import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@plants-app/auth';
import { getTranslocoTestingModule } from '@plants-app/shared';
import { of } from 'rxjs';

import { CalendarPage } from './calendar.page';

describe('CalendarPage', () => {
  let component: CalendarPage;
  let fixture: ComponentFixture<CalendarPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        getTranslocoTestingModule(),
        {
          provide: UserService,
          useValue: {
            getUser: () => of({})
          }
        },
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
