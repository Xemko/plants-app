import { AsyncPipe, DatePipe, KeyValuePipe, LowerCasePipe, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup, IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { User, UserService } from '@plants-app/auth';
import { getNextWateringPlantsByRoom, PlantsListComponent } from '@plants-app/plants';
import { addIcons } from 'ionicons';
import { alarmOutline, caretDownCircle, caretUpCircle, waterOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { CalendarResolvedData } from './calendar.routes';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { CalendarDay, CalendarSelectedDay } from './models/calendar.interface';

register();

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: [ 'calendar.page.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonAccordionGroup, IonAccordion, IonLabel, IonIcon, IonItem,
    DatePipe, TranslocoPipe, DateSelectorComponent, PlantsListComponent, KeyValuePipe, AsyncPipe, LowerCasePipe, NgIf, IonBadge, UpperCasePipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CalendarPage {
  private userService = inject(UserService);

  @Input({ required: true }) public data: CalendarResolvedData | null = null;

  public user$: Observable<User> = this.userService.getUser();
  public selectedDay: CalendarSelectedDay | null = null;

  constructor() {
    addIcons({ caretDownCircle, caretUpCircle, alarmOutline, waterOutline });
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
