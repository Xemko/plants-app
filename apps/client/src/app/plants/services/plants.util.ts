import { Plant, PlantsByRoomMap } from '../models/plant.interface';

export const mapToPlantsByRoom = (plants: Plant[]): PlantsByRoomMap => {
  return plants.reduce((acc, plant) => {
    if (!acc.has(plant.room)) {
      acc.set(plant.room, []);
    }
    (acc.get(plant.room) as Array<Plant>).push(plant);
    return acc;
  }, new Map<string, Array<Plant>>());
};
