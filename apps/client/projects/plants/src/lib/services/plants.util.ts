import { areLocaleDatesEqual } from '@plants-app/shared';
import { Plant, PlantsByRoomMap } from '../models/plant.interface';
import { PLANT_ACTIONS, PlantAction } from '../models/plant-action.model';

export const normalizePlants = (plants: Plant[]): Plant[] => 
  plants.map(plant => normalizePlant(plant));

export const normalizePlant = (plant: Plant): Plant => ({
  ...plant,
  nextWatering: plant.nextWatering?.map(date => new Date(date)),
  actions: normalizePlantActions(plant.actions),
});

export const normalizePlantActions = (actions: PlantAction[]): PlantAction[] =>
  actions?.reduce((acc, action) => {
    const plantAction = PLANT_ACTIONS.find(({ id }) => id === String(action));
    if (plantAction) {
      acc.push(plantAction);
    }
    return acc;
  }, [] as PlantAction[])

export const mapToPlantsByRoom = (plants: Plant[]): PlantsByRoomMap => {
  return plants.reduce((acc, plant) => {
    if (!acc.has(plant.room)) {
      acc.set(plant.room, []);
    }
    (acc.get(plant.room) as Array<Plant>).push(plant);
    return acc;
  }, new Map<string, Plant[]>());
};

export const getNextWateringPlants = (plants: Plant[], date: Date): Plant[] => {
  return plants.reduce((acc, plant) => {
    if (!Array.isArray(plant.nextWatering)) {
      return acc;
    }
    plant.nextWatering.forEach((nextWateringDate: Date) => {
      if (areLocaleDatesEqual(nextWateringDate)(date)) {
        acc.push(plant);
      }
    });
    return acc;
  }, [] as Plant[]);
}

export const getNextWateringPlantsByRoom = (plants: Plant[], date: Date) =>
  mapToPlantsByRoom(getNextWateringPlants(plants, date));