import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, TranslocoPipe ],
})
export class DashboardPage {
}
