import { AsyncPipe, LowerCasePipe, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { User, UserService } from '@plants-app/auth';
import {
  getNextWateringPlantsByRoom,
  PlantsAccordionGroupComponent,
  PlantsSwiperCardsComponent
} from '@plants-app/plants';
import { addIcons } from 'ionicons';
import { caretDownCircle, caretUpCircle } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { CalendarResolvedData } from './calendar.routes';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { CalendarDay, CalendarSelectedDay } from './models/calendar.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: [ 'calendar.page.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, AsyncPipe, NgIf, LowerCasePipe, UpperCasePipe, TranslocoPipe,
    DateSelectorComponent, PlantsAccordionGroupComponent, PlantsSwiperCardsComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CalendarPage {
  private userService = inject(UserService);

  @Input({ required: true }) public data: CalendarResolvedData | null = null;

  public user$: Observable<User> = this.userService.getUser();
  public selectedDay: CalendarSelectedDay | null = null;

  constructor() {
    addIcons({ caretDownCircle, caretUpCircle });
  }

  daySelected(day: CalendarDay | null): void {
    this.selectedDay = day && this.data
      ? ({
        date: day.date,
        plants: getNextWateringPlantsByRoom(this.data.plants, day.date),
      })
      : null;
  }

}
