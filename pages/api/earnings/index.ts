import { NextApiRequest, NextApiResponse } from 'next';
import { Tedis } from 'tedis';
import { v4 } from 'uuid';
import { IEarning } from '../../../interfaces/earning';

const tedisClient = new Tedis();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    return await getEarnings(req, res);
  } else if (req.method === 'POST') {
    return await createEarning(req, res);
  } else {
    return res.status(404).send({ message: 'Route not found' });
  }
}

async function getEarnings(_: NextApiRequest, res: NextApiResponse): Promise<void> {
  const earnings: string[] = await tedisClient.zrange('earnings', 0, -1);
  const parsedEarnings: IEarning[] = earnings.map((earning) => JSON.parse(earning));

  res.status(200).json(parsedEarnings);
}

async function createEarning(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { date, value } = req.body;
  const dateTimestamp = new Date(date).getTime();
  const newEarning: IEarning = {
    id: v4(),
    date: dateTimestamp,
    value
  };
  const member = JSON.stringify(newEarning);

  await tedisClient.zadd(
    'earnings' ,
    { [member]: dateTimestamp }
  );

  res.status(200).json(newEarning);
}
