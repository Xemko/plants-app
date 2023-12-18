export const getDaysOfWeekTitles = (): string[] => ([
  'dates.SundayShort',
  'dates.MondayShort',
  'dates.TuesdayShort',
  'dates.WednesdayShort',
  'dates.ThursdayShort',
  'dates.FridayShort',
  'dates.SaturdayShort',
]);

export const getWeekDays = (current: Date): { value: number; }[] => {
  const result: { value: number; }[] = [];
  // Starting Sunday
  current.setDate((current.getDate() - current.getDay() ));
  for (var i = 0; i < 7; i++) {
    result.push({ value: new Date(current).getDate() });
    current.setDate(current.getDate() +1);
  }
  console.log({result})
  return result;
}