import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { alarmOutline, waterOutline } from 'ionicons/icons';
import { Plant } from '../models/plant.interface';
import { PlantsService } from '../services/plants.service';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: [ './plant-item.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PlantItemComponent {
  private plantService = inject(PlantsService);

  @Input({ required: true }) public plant: Plant | undefined;

  constructor() {
    addIcons({ alarmOutline, waterOutline })
  }

  navigateToPlantDetails(plant: Plant): void {
    this.plantService.navigateToPlantDetails(plant);
  }

}
