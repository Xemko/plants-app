import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { calendar, newspaper } from 'ionicons/icons';
import { SignOutService, UserService } from '@plants-app/auth';

@Component({
  selector: 'app-default-layout',
  templateUrl: 'default-layout.component.html',
  styleUrls: [ 'default-layout.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonHeader,
    IonTitle, IonToolbar, IonMenu, IonButtons, IonMenuButton, TranslocoPipe, IonCard, IonButton, IonCardSubtitle,
    AsyncPipe, NgFor,
  ],
})
export class DefaultLayoutComponent {
  private signOutService = inject(SignOutService);
  private userService = inject(UserService);

  public tabs = [
    {
      name: 'dashboard',
      icon: 'newspaper',
      label: 'dashboard.title',
      link: '/dashboard'
    },
    {
      name: 'calendar',
      icon: 'calendar',
      label: 'calendar.title',
      link: '/calendar',
    },
  ];
  public user$ = this.userService.getUser();

  constructor() {
    addIcons({ calendar, newspaper });
  }

  async signOut(): Promise<void> {
    await this.signOutService.signOut();
  }

}
