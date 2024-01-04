import { PlantsByRoomMap } from '@plants-app/plants';

export interface CalendarDay {
  date: Date;
  hasEvents: boolean;
}

export interface CalendarSelectedDay {
  date: Date;
  plants: PlantsByRoomMap;
}