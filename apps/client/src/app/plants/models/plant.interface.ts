import { ServerResponseBase } from '../../common/models/server-response.model';

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
