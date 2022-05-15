import useSwr from 'swr';
import { differenceInMonths } from 'date-fns';

import { get } from '../lib/request';
import { sortByDate } from '../lib/date';
import { sumCurrencyValues, formatCurrency } from '../lib/currency';
import { IEarning } from '../interfaces/earning';
import { ICompensation } from '../interfaces/compensation';

export default function useDashboard() {
  const { data: earnings } = useSwr<IEarning[]>('/api/earnings', get);
  const { data: compensations } = useSwr<ICompensation[]>('/api/compensations', get);

  const calculateLastTwelveMonthsEarnings = () => {
    const sortedEarnings = earnings?.sort(sortByDate) || [];
    const earningsFromLastTwelveMonths = sortedEarnings.filter((earning) => {
      const difference = differenceInMonths(Date.now(), earning.date);
  
      return difference > 0 && difference <= 12;
    });
    const lastTwelveMonthsEarnings = earningsFromLastTwelveMonths.reduce(sumCurrencyValues, 0);

    return formatCurrency(lastTwelveMonthsEarnings);
  };
  const calculateLastTwelveMonthsCompensations = () => {
    const sortedCompensations = compensations?.sort(sortByDate) || [];
    const compensationsFromLastTwelveMonths = sortedCompensations.filter((compensation) => {
      const difference = differenceInMonths(Date.now(), compensation.date);
  
      return difference > 0 && difference <= 12;
    });
    const lastTwelveMonthsCompensations = compensationsFromLastTwelveMonths.reduce(sumCurrencyValues, 0);

    return formatCurrency(lastTwelveMonthsCompensations);
  };
  const calculateNextMonthCompensation = () => {
    const earningsFromLastTwelveMonthsIncludingCurrentMonth = (earnings || [])
      .sort(sortByDate)
      .filter((earning) => {
        const difference = differenceInMonths(Date.now(), earning.date);

        return difference >= 0 && difference < 12;
      })
      .reduce(sumCurrencyValues, 0);
    const compensationsFromLastElevenMonths = (compensations || [])
      .sort(sortByDate)
      .filter((compensation) => {
        const difference = differenceInMonths(Date.now(), compensation.date);

        return difference >= 0 && difference < 12;
      })
      .reduce(sumCurrencyValues, 0);
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
