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

async function getEarnings(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { year } = req.query;
  let earnings: string[];

  if (year) {
    earnings = await tedisClient.zrangebyscore(
      'earnings',
      `01${year}`,
      `12${year}`
    );
  } else {
    earnings = await tedisClient.zrange('earnings', 0, -1);
  }

  const parsedEarnings: IEarning[] = earnings.map((earning) => JSON.parse(earning));

  res.status(200).json(parsedEarnings);
}

async function createEarning(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { date, value } = req.body;
  const parsedDate = new Date(date);
  const day = String(parsedDate.getUTCDate()).padStart(2, '0');
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
  const year = parsedDate.getUTCFullYear();
  const newEarning: IEarning = {
    id: v4(),
    date: `${day}/${month}/${year}`,
    value
  };
  const member = JSON.stringify(newEarning);

  await tedisClient.zadd(
    'earnings' ,
    { [member]: parsedDate.getTime() }
  );

  res.status(200).json(newEarning);
}
