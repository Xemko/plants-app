import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlantItemComponent } from '../plant-item/plant-item.component';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: [ './plants-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ PlantItemComponent, NgForOf ]
})
export class PlantsListComponent implements OnInit {
  @Input({ required: true }) public plants: { name: string; img: string; }[] = [];

  ngOnInit() {
  }

}
