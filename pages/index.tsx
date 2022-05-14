import useSwr from 'swr';
import { differenceInMonths } from 'date-fns';

import { getEarnings, sortEarningsByDate, sumEarnings } from '../lib/earnings';
import { formatCurrency } from '../lib/currency';

export default function Home() {
  const { data: earnings } = useSwr('/api/earnings', getEarnings);
  const sortedEarnings = earnings?.sort(sortEarningsByDate) || [];
  const earningsFromLastTwelveMonths = sortedEarnings.filter((earning) => {
    const difference = differenceInMonths(Date.now(), earning.date);

    return difference > 0 && difference <= 12;
  });
  const lastTwelveMonthsEarnings = earningsFromLastTwelveMonths.reduce(sumEarnings, 0);
  const formattedEarning = formatCurrency(lastTwelveMonthsEarnings);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
        <h1 className="text-primary-800 text-2xl font-bold">Last 12 months earnings</h1>
        <span className="font-bold">{formattedEarning}</span>
      </div>
    </div>
  );
}
