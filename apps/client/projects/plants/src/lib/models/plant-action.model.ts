import { addIcons } from "ionicons";
import { alarmOutline, volumeHighOutline, waterOutline } from "ionicons/icons";

export interface PlantAction {
  id: 'alarm' | 'snooze' | 'water';
  type: 'system' | 'user';
  icon: string;
  order: number;
}

export const PLANT_ACTIONS: PlantAction[] = [
  {
    id: 'alarm',
    type: 'system',
    icon: 'volume-high-outline',
    order: 1,
  },
  {
    id: 'snooze',
    type: 'user',
    icon: 'alarm-outline',
    order: 2,
  },
  {
    id: 'water',
    type: 'user',
    icon: 'water-outline',
    order: 3,
  },
];

export const addPlantActionIcons = () => addIcons({ volumeHighOutline, alarmOutline, waterOutline });

export const PLANT_SYSTEM_ACTIONS: PlantAction[] = PLANT_ACTIONS.filter(action => action.type === 'system');

export const PLANT_USER_ACTIONS: PlantAction[] = PLANT_ACTIONS.filter(action => action.type === 'user');
