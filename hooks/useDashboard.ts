import useSwr from 'swr';
import { differenceInMonths } from 'date-fns';

import { getEarnings, sortEarningsByDate, sumEarnings } from '../lib/earnings';
import { getCompensations, sortCompensationsByDate, sumCompensations } from '../lib/compensations';
import { formatCurrency } from '../lib/currency';

export default function useDashboard() {
  const { data: earnings } = useSwr('/api/earnings', getEarnings);
  const { data: compensations } = useSwr('/api/compensations', getCompensations);

  const calculateLastTwelveMonthsEarnings = () => {
    const sortedEarnings = earnings?.sort(sortEarningsByDate) || [];
    const earningsFromLastTwelveMonths = sortedEarnings.filter((earning) => {
      const difference = differenceInMonths(Date.now(), earning.date);
  
      return difference > 0 && difference <= 12;
    });
    const lastTwelveMonthsEarnings = earningsFromLastTwelveMonths.reduce(sumEarnings, 0);

    return formatCurrency(lastTwelveMonthsEarnings);
  };
  const calculateLastTwelveMonthsCompensations = () => {
    const sortedCompensations = compensations?.sort(sortCompensationsByDate) || [];
    const compensationsFromLastTwelveMonths = sortedCompensations.filter((compensation) => {
      const difference = differenceInMonths(Date.now(), compensation.date);
  
      return difference > 0 && difference <= 12;
    });
    const lastTwelveMonthsCompensations = compensationsFromLastTwelveMonths.reduce(sumCompensations, 0);

    return formatCurrency(lastTwelveMonthsCompensations);
  };
  const calculateNextMonthCompensation = () => {
    const earningsFromLastTwelveMonthsIncludingCurrentMonth = (earnings || []).sort(sortEarningsByDate)
      .filter((earning) => {
        const difference = differenceInMonths(Date.now(), earning.date);

        return difference >= 0 && difference < 12;
      })
      .reduce(sumEarnings, 0);
    const compensationsFromLastElevenMonths = (compensations || [])
      .sort(sortCompensationsByDate)
      .filter((compensation) => {
        const difference = differenceInMonths(Date.now(), compensation.date);

        return difference >= 0 && difference < 12;
      })
      .reduce(sumCompensations, 0);
    const neededCompensationForFactorR = (28 / 100) * earningsFromLastTwelveMonthsIncludingCurrentMonth;
    const nextMonthCompensation = neededCompensationForFactorR - compensationsFromLastElevenMonths;

    return formatCurrency(nextMonthCompensation);
  };

  return {
    calculateLastTwelveMonthsEarnings,
    calculateLastTwelveMonthsCompensations,
    calculateNextMonthCompensation
  };
}
