import { KeyValuePipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { PlantsByRoomMap } from '../models/plant.interface';
import { PlantsListComponent } from '../plants-list/plants-list.component';

@Component({
  selector: 'app-plants-accordion-group',
  templateUrl: './plants-accordion-group.component.html',
  styleUrls: ['./plants-accordion-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ KeyValuePipe, NgFor, IonAccordionGroup, IonAccordion, IonLabel, IonItem, TranslocoPipe, PlantsListComponent, ],
})
export class PlantsAccordionGroupComponent {
  @Input({ required: true }) plants: PlantsByRoomMap | undefined;
}
