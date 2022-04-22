import { NextApiRequest, NextApiResponse } from 'next';
import { Tedis } from 'tedis';
import { v4 } from 'uuid';
import { IEarning } from '../../../interfaces/earning';

const tedisClient = new Tedis();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    return await getEarnings(req, res);
  } else if (req.method === 'POST') {
    console.log('POST REQUEST');
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
  // Validar a data
  // const newEarning: IEarning = {
  //   id: v4(),
  //   date,
  //   value
  // };
}
