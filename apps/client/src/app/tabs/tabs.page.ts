import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { calendar, newspaper } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: [ 'tabs.page.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, TranslocoPipe ],
})
export class TabsPage {

  constructor() {
    addIcons({ calendar, newspaper });
  }
}
