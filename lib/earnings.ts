import { IEarning } from '../interfaces/earning';

export async function getEarnings(url: string): Promise<IEarning[]> {
  const response = await fetch(url);

  return response.json();
}

export async function createEarning(url, data): Promise<IEarning> {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/json' }
  });

  return response.json();
}
