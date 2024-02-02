import { PlantsByRoomMap } from '@plants-app/plants';

export interface CalendarDay {
  date: Date;
  events: Date[];
}

export interface CalendarSelectedDay {
  date: Date;
  plants: PlantsByRoomMap;
}