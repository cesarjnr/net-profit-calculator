interface DateObj {
  date: number;
}

export function formatDate(date: number): string {
  const parsedDate = new Date(date);
  const day = parsedDate.getUTCDate().toString().padStart(2, '0');
  const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const sortByDate = (a: DateObj, b: DateObj): number => {
  const aTimestamp = new Date(a.date).getTime();
  const bTimestamp = new Date(b.date).getTime();

  if (aTimestamp < bTimestamp) {
    return -1;
  } else if (aTimestamp > bTimestamp) {
    return 1;
  } else {
    return 0;
  }
}
