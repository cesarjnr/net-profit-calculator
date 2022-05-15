import useSwr from 'swr';
import { differenceInMonths } from 'date-fns';

import { getEarnings, sortEarningsByDate, sumEarnings } from '../lib/earnings';
import { formatCurrency } from '../lib/currency';
import { getCompensations, sortCompensationsByDate, sumCompensations } from '../lib/compensations';

export default function Home() {
  const { data: earnings } = useSwr('/api/earnings', getEarnings);
  const { data: compensations } = useSwr('/api/compensations', getCompensations);
  const sortedEarnings = earnings?.sort(sortEarningsByDate) || [];
  const earningsFromLastTwelveMonths = sortedEarnings.filter((earning) => {
    const difference = differenceInMonths(Date.now(), earning.date);

    return difference > 0 && difference <= 12;
  });
  const lastTwelveMonthsEarnings = earningsFromLastTwelveMonths.reduce(sumEarnings, 0);
  const formattedEarning = formatCurrency(lastTwelveMonthsEarnings);
  const sortedCompensations = compensations?.sort(sortCompensationsByDate) || [];
  const compensationsFromLastTwelveMonths = sortedCompensations.filter((compensation) => {
    const difference = differenceInMonths(Date.now(), compensation.date);

    return difference > 0 && difference <= 12;
  });
  const lastTwelveMonthsCompensations = compensationsFromLastTwelveMonths.reduce(sumCompensations, 0);
  const formattedCompensation = formatCurrency(lastTwelveMonthsCompensations);

  return (
    <div className="h-full flex justify-center items-center gap-10">
      <div className="rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
        <h1 className="text-primary-800 text-2xl font-bold">Last 12 months earnings</h1>
        <span className="font-bold">{formattedEarning}</span>
      </div>

      <div className="rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
      <h1 className="text-primary-800 text-2xl font-bold">Last 12 months compensations</h1>
        <span className="font-bold">{formattedCompensation}</span>
      </div>
    </div>
  );
}
