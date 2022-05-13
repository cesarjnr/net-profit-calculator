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
