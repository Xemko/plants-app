import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { PLANT_SYSTEM_ACTIONS, PlantAction, PlantDetailsResolvedData, addPlantActionIcons } from '@plants-app/plants';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.page.html',
  styleUrls: ['./plant-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon,
    DatePipe, NgIf, NgFor, UpperCasePipe, TranslocoPipe,
  ]
})
export class PlantDetailsPage implements OnChanges {
  @Input({ required: true }) data: PlantDetailsResolvedData | undefined;

  public plantActions: PlantAction[] = [];

  constructor() {
    addPlantActionIcons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.plantActions = [
        ...changes['data'].currentValue?.plant.actions || [],
        ...PLANT_SYSTEM_ACTIONS,
      ].filter((action, index, self) =>
        self.findIndex(a => a.id === action.id) === index
      ).sort((a, b) => a.order - b.order);
    }
  }

}

