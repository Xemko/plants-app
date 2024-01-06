import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Plant } from '../models/plant.interface';
import { PlantCardItemComponent } from '../plant-card-item/plant-card-item.component';

register();

@Component({
  selector: 'app-plants-swiper-cards',
  templateUrl: './plants-swiper-cards.component.html',
  styleUrls: ['./plants-swiper-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ NgFor, NgIf, DatePipe, PlantCardItemComponent, ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PlantsSwiperCardsComponent {
  @Input({ required: true }) plants: Plant[] | undefined;
}
