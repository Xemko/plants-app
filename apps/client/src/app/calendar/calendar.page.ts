import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader, IonItem, IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { caretDownCircle, caretUpCircle } from 'ionicons/icons';
import { Plant } from '../plants/models/plant.interface';
import { PlantsListComponent } from '../plants/plants-list/plants-list.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: [ 'calendar.page.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonAccordionGroup, IonAccordion, IonLabel, IonItem,
    DatePipe, TranslocoPipe, DateSelectorComponent, PlantsListComponent ]
})
export class CalendarPage {
  public currentDate = new Date();
  public rooms: { id: string; name: string; plants: Plant[]; }[] = [
    {
      id: '1',
      name: 'Room 1',
      plants: [
        {
          id: '1',
          name: 'Plant 1',
          img: 'https://media.istockphoto.com/id/1380361370/photo/decorative-banana-plant-in-concrete-vase-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=eYADMQ9dXTz1mggdfn_exN2gY61aH4fJz1lfMomv6o4=',
        }
      ]
    },
    {
      id: '2',
      name: 'Room 2',
      plants: [
        {
          id: '2',
          name: 'Plant 2',
          img: 'https://i0.wp.com/laidbackgardener.blog/wp-content/uploads/2017/02/20170203f.jpg?resize=475%2C655&ssl=1'
        },
        {
          id: '3',
          name: 'Plant 3',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSreIJWPXH5fmKbxN3rFjGpNBRZZFuVRpx1x57Df1csQYQ2-wN-SgFCLQuNU5Ba1_v5k&usqp=CAU'
        }
      ]
    }
  ];

  constructor() {
    addIcons({ caretDownCircle, caretUpCircle });
  }
}
