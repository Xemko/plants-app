import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@plants-app/auth';
import { getTranslocoTestingModule } from '@plants-app/shared';
import { of } from 'rxjs';

import { PlantsCalendarPage } from './plants-calendar-page.component';

describe('CalendarPage', () => {
  let component: PlantsCalendarPage;
  let fixture: ComponentFixture<PlantsCalendarPage>;

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
    fixture = TestBed.createComponent(PlantsCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
