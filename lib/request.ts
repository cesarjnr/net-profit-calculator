export async function get<T>(url: string): Promise<T[]> {
  const response = await fetch(url);

  return response.json();
}

export async function post<T, U>(url: string, data: T): Promise<U> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  return response.json();
}
