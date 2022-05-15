import { ICompensation, ICreateCompensation } from '../interfaces/compensation';

export async function getCompensations(url: string): Promise<ICompensation[]> {
  const response = await fetch(url);

  return response.json();
}

export async function createCompensation(url: string, data: ICreateCompensation): Promise<ICompensation> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  return response.json();
}

export const sortCompensationsByDate = (a: ICompensation, b: ICompensation): number => {
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

export const sumCompensations = (totalCompensations: number, currentCompensation: ICompensation): number => (
  totalCompensations + Number(currentCompensation.value)
);
