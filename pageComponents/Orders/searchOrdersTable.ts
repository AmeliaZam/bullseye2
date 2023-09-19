import { ResponseType, SearchObjectType } from './OrdersTable.types';

const MONTHS: Record<string, string> = {
  jan: 'January',
  feb: 'February',
  mar: 'March',
  apr: 'April',
  may: 'May',
  jun: 'June',
  jul: 'July',
  aug: 'August',
  sep: 'September',
  oct: 'October',
  nov: 'November',
  dec: 'December',
};

export default function searchOrdersTable(
  data: ResponseType,
  searchObject: SearchObjectType
) {
  return data.filter((order) => {
    return Object.entries(searchObject).every(([key, value]) => {
      if (value === '' || value === null) {
        return true;
      }

      if (key === 'bookedMonth' || key === 'bookedYear') {
        const salesScheduleArray = order.salesSchedule.split(' - ');
        const month = salesScheduleArray[0];
        const year = salesScheduleArray[1];
        if (key === 'bookedMonth') {
          const valueFull = MONTHS[value.toLowerCase()];
          if (
            month.toLowerCase() !== value.toLowerCase() &&
            month.toLowerCase() !== valueFull.toLowerCase()
          ) {
            return false;
          }
        }
        if (key === 'bookedYear' && year !== value) {
          return false;
        }
      } else if (
        key in order &&
        String(order[key as keyof typeof order]).toLowerCase() !==
          String(value).toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  });
}
