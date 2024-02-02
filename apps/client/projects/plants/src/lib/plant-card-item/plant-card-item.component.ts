import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { PlantsService } from '@plants-app/plants';
import { Plant } from '../models/plant.interface';

@Component({
  selector: 'app-plant-card-item',
  templateUrl: './plant-card-item.component.html',
  styleUrls: ['./plant-card-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ NgFor, DatePipe, UpperCasePipe ],
})
export class PlantCardItemComponent {
  private plantService = inject(PlantsService);
  
  @Input({ required: true }) plant: Plant | undefined;

  navigateToPlantDetails(plant: Plant): void {
    this.plantService.navigateToPlantDetails(plant);
  }

}
