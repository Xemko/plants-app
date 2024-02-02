import { ServerResponseBase } from '@plants-app/shared';
import { PlantAction } from './plant-action.model';

export interface Plant {
  id: string;
  name: string;
  image: string;
  description: string;
  room: string;
  nextWatering: Date[];
  actions: PlantAction[];
}

export interface PlantsResponse extends ServerResponseBase {
  plants: Plant[];
}

export interface PlantResponse extends ServerResponseBase {
  plant: Plant;
}

export type PlantsByRoomMap = Map<Plant['room'], Array<Plant>>;
