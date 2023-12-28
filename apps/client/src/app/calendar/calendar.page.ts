import { DatePipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { caretDownCircle, caretUpCircle } from 'ionicons/icons';
import { PlantsByRoomMap, PlantsListComponent } from '@plants-app/plants';
import { DateSelectorComponent } from './date-selector/date-selector.component';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: [ 'calendar.page.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonAccordionGroup, IonAccordion, IonLabel, IonItem,
    DatePipe, TranslocoPipe, DateSelectorComponent, PlantsListComponent, KeyValuePipe, JsonPipe ],
})
export class CalendarPage {
  public currentDate = new Date();
  @Input() public plants?: PlantsByRoomMap;

  constructor() {
    addIcons({ caretDownCircle, caretUpCircle });
  }
}
