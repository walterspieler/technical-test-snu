import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export function getMonths(count = 20) {
  const arr = [];
  var d = new Date();
  for (let i = 0; i < count; i++) {
    arr.push(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - i, 1)));
  }
  return arr;
}

export function formatDate(date, dFormat = "dd/MM/yy @HH:mm") {
  // Convert to your desired timezone if needed
  if (!date) {
    return "-";
  }

  // Format the date in English relative format
  return format(new Date(date), dFormat, { locale: enUS });
}
