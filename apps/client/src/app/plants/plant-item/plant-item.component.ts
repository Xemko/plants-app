import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { alarmOutline, waterOutline } from 'ionicons/icons';

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
  @Input({ required: true }) public plant: { name: string; img: string; } | undefined;

  constructor() {
    addIcons({ alarmOutline, waterOutline })
  }

  ngOnInit() {
  }

}
