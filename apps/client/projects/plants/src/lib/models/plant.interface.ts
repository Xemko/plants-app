import { ServerResponseBase } from '@plants-app/shared';

export interface Plant {
  id: string;
  name: string;
  image: string;
  room: string;
  nextWatering: Date[];
}

export interface PlantsResponse extends ServerResponseBase {
  plants: Plant[];
}

export type PlantsByRoomMap = Map<Plant['room'], Array<Plant>>;
