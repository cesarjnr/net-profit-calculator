import { IEarning, ICreateEarning } from '../interfaces/earning';

export async function getEarnings(url: string): Promise<IEarning[]> {
  const response = await fetch(url);

  return response.json();
}

export async function createEarning(url, data: ICreateEarning): Promise<IEarning> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  return response.json();
}

export const sortEarningsByDate = (a: IEarning, b: IEarning): number => {
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

export const sumEarnings = (totalEarnings: number, currentEarning: IEarning) => (
  totalEarnings + Number(currentEarning.value)
);
