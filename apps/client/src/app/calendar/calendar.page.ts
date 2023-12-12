import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: [ 'calendar.page.scss' ],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, TranslocoPipe ]
})
export class CalendarPage {

}
