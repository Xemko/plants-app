import { Plant } from '../models/plant.interface';
import { getNextWateringPlants, mapToPlantsByRoom, normalizePlants } from './plants.util';

describe('PlantsUtil', () => {

  describe('normalizePlants', () => {

    it('should return normalized plants', () => {
      // GIVEN
      const plants: Plant[] = [
        {
          id: '1',
          name: 'Plant 1',
          image: 'image 1',
          room: 'Room 1',
          nextWatering: [ '2021-01-01T00:00:00', '2021-01-02T00:00:00' ] as any
        },
        {
          id: '2',
          name: 'Plant 2',
          image: 'image 2',
          room: 'Room 2',
          nextWatering: [ '2021-01-02T00:00:00', '2021-01-03T00:00:00' ] as any
        },
      ];
      const expectedResult: Plant[] = [
        {
          id: '1',
          name: 'Plant 1',
          image: 'image 1',
          room: 'Room 1',
          nextWatering: [ new Date('2021-01-01T00:00:00'), new Date('2021-01-02T00:00:00') ]
        },
        {
          id: '2',
          name: 'Plant 2',
          image: 'image 2',
          room: 'Room 2',
          nextWatering: [ new Date('2021-01-02T00:00:00'), new Date('2021-01-03T00:00:00') ]
        },
      ];

      // WHEN
      const result = normalizePlants(plants);

      // THEN
      expect(result).toEqual(expectedResult);
    });

  });

  describe('mapToPlantsByRoom', () => {

    it('should map to correct data', () => {
      // GIVEN
      const plants: Plant[] = [
        {
          id: '1',
          name: 'Plant 1',
          image: 'image 1',
          room: 'Room 1',
          nextWatering: [ new Date('2021-01-01T00:00:00') ],
        },
        {
          id: '2',
          name: 'Plant 2',
          image: 'image 2',
          room: 'Room 2',
          nextWatering: [ new Date('2021-01-01T00:00:00') ],
        },
        {
          id: '3',
          name: 'Plant 3',
          image: 'image 3',
          room: 'Room 1',
          nextWatering: [ new Date('2021-01-01T00:00:00') ],
        }
      ];
      const expectedResult = new Map<string, Array<Plant>>([
        [ 'Room 1', [
          {
            id: '1',
            name: 'Plant 1',
            image: 'image 1',
            room: 'Room 1',
            nextWatering: [ new Date('2021-01-01T00:00:00') ],
          },
          {
            id: '3',
            name: 'Plant 3',
            image: 'image 3',
            room: 'Room 1',
            nextWatering: [ new Date('2021-01-01T00:00:00') ],
          }
        ] ],
        [ 'Room 2', [
          {
            id: '2',
            name: 'Plant 2',
            image: 'image 2',
            room: 'Room 2',
            nextWatering: [ new Date('2021-01-01T00:00:00') ],
          }
        ] ]
      ]);

      // WHEN
      const result = mapToPlantsByRoom(plants);

      // THEN
      expect(result).toEqual(expectedResult);
    });

  });

  describe('getNextWateringPlants', () => {

    it('should return empty map if no plants', () => {
      // GIVEN
      const plants: Plant[] = [];
      const expectedResult: Plant[] = [];

      // WHEN
      const result = getNextWateringPlants(plants, new Date('2021-01-01T00:00:00Z'));

      // THEN
      expect(result).toEqual(expectedResult);
    });

    it('should return empty map if there are no next watering plants at the specified date', () => {
      // GIVEN
      const plants: Plant[] = [
        {
          id: '1',
          name: 'Plant 1',
          image: 'image 1',
          room: 'Room 1',
          nextWatering: [ new Date('2021-01-01T20:34:16Z') ],
        },
        {
          id: '2',
          name: 'Plant 2',
          image: 'image 2',
          room: 'Room 2',
          nextWatering: [ new Date('2021-01-01T12:12:00Z') ],
        },
      ];
      const expectedResult: Plant[] = [];

      // WHEN
      const result = getNextWateringPlants(plants, new Date('2021-01-02T00:00:00Z'));

      // THEN
      expect(result).toEqual(expectedResult);
    });

    it('should return next watering plants if the specified date is matches', () => {
      // GIVEN
      const plants: Plant[] = [
        {
          id: '1',
          name: 'Plant 1',
          image: 'image 1',
          room: 'Room 1',
          nextWatering: [ new Date('2021-01-01T20:34:16Z') ],
        },
        {
          id: '2',
          name: 'Plant 2',
          image: 'image 2',
          room: 'Room 2',
          nextWatering: [ new Date('2021-01-01T12:12:00Z') ],
        },
      ];
      const expectedResult: Plant[] = [
        {
          id: '1',
          name: 'Plant 1',
          image: 'image 1',
          room: 'Room 1',
          nextWatering: [ new Date('2021-01-01T20:34:16Z') ],
        },
        {
          id: '2',
          name: 'Plant 2',
          image: 'image 2',
          room: 'Room 2',
          nextWatering: [ new Date('2021-01-01T12:12:00Z') ],
        },
      ];

      // WHEN
      const result = getNextWateringPlants(plants, new Date('2021-01-01T00:00:00Z'));

      // THEN
      expect(result).toEqual(expectedResult);
    });

  });

});