import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input({ required: true }) plant: Plant | undefined;

}
