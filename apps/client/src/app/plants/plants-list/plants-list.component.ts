import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Plant } from '../models/plant.interface';
import { PlantItemComponent } from '../plant-item/plant-item.component';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: [ './plants-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ PlantItemComponent ]
})
export class PlantsListComponent implements OnInit {
  @Input({ required: true }) public plants: Plant[] = [];

  ngOnInit() {
  }

}
