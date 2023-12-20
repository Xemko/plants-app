import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { alarmOutline, waterOutline } from 'ionicons/icons';
import { Plant } from '../models/plant.interface';

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
export class PlantItemComponent implements OnInit {
  @Input({ required: true }) public plant: Plant | undefined;

  constructor() {
    addIcons({ alarmOutline, waterOutline })
  }

  ngOnInit() {
  }

}
