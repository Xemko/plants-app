export const areLocaleDatesEqual = (dateA: Date) => (dateB: Date): boolean =>
  dateA.toLocaleDateString() === dateB.toLocaleDateString();

export const getDaysOfWeekTitles = (): string[] => ([
  'dates.SundayShort',
  'dates.MondayShort',
  'dates.TuesdayShort',
  'dates.WednesdayShort',
  'dates.ThursdayShort',
  'dates.FridayShort',
  'dates.SaturdayShort',
]);