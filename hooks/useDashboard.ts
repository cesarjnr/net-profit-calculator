import useSwr from 'swr';
import { differenceInMonths } from 'date-fns';

import { get } from '../lib/request';
import { sortByDate } from '../lib/date';
import { sumCurrencyValues, formatCurrency } from '../lib/currency';
import { IEarning } from '../interfaces/earning';
import { ICompensation } from '../interfaces/compensation';

interface UseDashboard {
  getLastTwelveMonthsEarnings: () => string;
  getLastTwelveMonthsCompensations: () => string;
  getNextMonthGrossCompensation: () => string;
  // getNextMonthNetCompensation: () => string;
}
interface InssTax {
  rate: number;
  ceiling: number;
}

export default function useDashboard(): UseDashboard {
  const { data: earnings } = useSwr<IEarning[]>('/api/earnings', get);
  const { data: compensations } = useSwr<ICompensation[]>('/api/compensations', get);
  const inssTax: InssTax = {
    rate: 0.11,
    ceiling: 7087.22
  };

  const getLastTwelveMonthsEarnings = () => {
    const sortedEarnings = earnings?.sort(sortByDate) || [];
    const earningsFromLastTwelveMonths = sortedEarnings.filter((earning) => {
      const difference = differenceInMonths(Date.now(), earning.date);
  
      return difference > 0 && difference <= 12;
    });
    const lastTwelveMonthsEarnings = earningsFromLastTwelveMonths.reduce(sumCurrencyValues, 0);

    return formatCurrency(lastTwelveMonthsEarnings);
  };
  const getLastTwelveMonthsCompensations = () => {
    const sortedCompensations = compensations?.sort(sortByDate) || [];
    const compensationsFromLastTwelveMonths = sortedCompensations.filter((compensation) => {
      const difference = differenceInMonths(Date.now(), compensation.date);
  
      return difference > 0 && difference <= 12;
    });
    const lastTwelveMonthsCompensations = compensationsFromLastTwelveMonths.reduce(sumCurrencyValues, 0);

    return formatCurrency(lastTwelveMonthsCompensations);
  };
  const getNextMonthGrossCompensation = () => {
    const nextMonthGrossCompensation = calculateNextMonthGrossCompensation();

    return formatCurrency(nextMonthGrossCompensation);
  };
  const getNextMonthNetCompensation = () => {
    const nextMonthGrossCompensation = calculateNextMonthGrossCompensation();
    const discountBaseValue = nextMonthGrossCompensation > inssTax.ceiling ? inssTax.ceiling : nextMonthGrossCompensation;
    const nextMonthInss = inssTax.rate * discountBaseValue;
    const nextMonthCompensationMinusInss = nextMonthGrossCompensation - nextMonthInss;
  };
  const calculateNextMonthGrossCompensation = () => {
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
    const currentCompensationForFactorR = neededCompensationForFactorR - compensationsFromLastElevenMonths;
    const nextMonthCompensation = currentCompensationForFactorR >= 0 ? currentCompensationForFactorR : 0;

    return nextMonthCompensation;
  };

  getNextMonthNetCompensation();

  return {
    getLastTwelveMonthsEarnings,
    getLastTwelveMonthsCompensations,
    getNextMonthGrossCompensation,
    // getNextMonthNetCompensation
  };
}
