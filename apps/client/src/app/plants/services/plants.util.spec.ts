import { Plant } from '../models/plant.interface';
import { mapToPlantsByRoom } from './plants.util';

describe('PlantsUtil', () => {

  describe('mapToPlantsByRoom', () => {

    it('should map to correct data', () => {
      // GIVEN
      const plants: Plant[] = [
        {
          id: '1',
          name: 'Plant 1',
          image: 'image 1',
          room: 'Room 1'
        },
        {
          id: '2',
          name: 'Plant 2',
          image: 'image 2',
          room: 'Room 2'
        },
        {
          id: '3',
          name: 'Plant 3',
          image: 'image 3',
          room: 'Room 1'
        }
      ];
      const expectedResult = new Map<string, Array<Plant>>([
        [ 'Room 1', [
          {
            id: '1',
            name: 'Plant 1',
            image: 'image 1',
            room: 'Room 1'
          },
          {
            id: '3',
            name: 'Plant 3',
            image: 'image 3',
            room: 'Room 1'
          }
        ] ],
        [ 'Room 2', [
          {
            id: '2',
            name: 'Plant 2',
            image: 'image 2',
            room: 'Room 2'
          }
        ] ]
      ]);

      // WHEN
      const result = mapToPlantsByRoom(plants);

      // THEN
      expect(result).toEqual(expectedResult);
    });

  });

});