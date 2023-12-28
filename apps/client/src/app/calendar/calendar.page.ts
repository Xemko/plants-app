import { AsyncPipe, DatePipe, JsonPipe, KeyValuePipe, LowerCasePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
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
import { User, UserService } from '@plants-app/auth';
import { Observable } from 'rxjs';
import { DateSelectorComponent } from './date-selector/date-selector.component';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: [ 'calendar.page.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonAccordionGroup, IonAccordion, IonLabel, IonItem,
    DatePipe, TranslocoPipe, DateSelectorComponent, PlantsListComponent, KeyValuePipe, AsyncPipe, LowerCasePipe, NgIf ],
})
export class CalendarPage {
  private userService = inject(UserService);

  public user$: Observable<User> = this.userService.getUser();
  public currentDate = new Date();
  @Input() public plants?: PlantsByRoomMap;

  constructor() {
    addIcons({ caretDownCircle, caretUpCircle });
  }
}
