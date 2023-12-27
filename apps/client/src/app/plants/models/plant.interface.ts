import { ServerResponseBase } from '@plants-app/infra';

export interface Plant {
  id: string;
  name: string;
  image: string;
  room: string;
}

export interface PlantsResponse extends ServerResponseBase {
  plants: Plant[];
}

export type PlantsByRoomMap = Map<string, Array<Plant>>;
