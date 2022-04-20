export async function getEarnings(url: string) {
  const response = await fetch(url);

  return response.json();
}

export async function createEarning({ url, data }: { url: string, data: any }) {
  const response = await fetch(url, { body: data });

  return response.json();
}
