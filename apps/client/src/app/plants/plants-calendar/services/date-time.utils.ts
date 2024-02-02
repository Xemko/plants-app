import { areLocaleDatesEqual } from '@plants-app/shared';
import { CalendarDay } from '../models/calendar.interface';

export const getWeekDays = (current: Date, events: Date[]): CalendarDay[] => {
  const result: CalendarDay[] = [];
  // Starting Sunday
  current.setDate((current.getDate() - current.getDay() ));
  for (let i = 0; i < 7; i++) {
    const date = new Date(current);
    result.push({
      date,
      events: events.filter(areLocaleDatesEqual(date)),
    });
    current.setDate(current.getDate() + 1);
  }
  return result;
}