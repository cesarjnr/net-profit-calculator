import { NextApiRequest, NextApiResponse } from 'next';
import { Tedis } from 'tedis';
import { v4 } from 'uuid';

import { ICompensation } from '../../../interfaces/compensation';

const tedisClient = new Tedis();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    return await getCompensations(req, res);
  } else if (req.method === 'POST') {
    return await createCompensation(req, res);
  } else {
    return res.status(404).send({ message: 'Route not found' });
  }
}

async function getCompensations(_: NextApiRequest, res: NextApiResponse): Promise<void> {
  const compensations: string[] = await tedisClient.zrange('compensations', 0, -1);
  const parsedCompensations: ICompensation[] = compensations.map((compensation) => JSON.parse(compensation));

  res.status(200).json(parsedCompensations);
}

async function createCompensation(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { date, value } = req.body;
  const dateTimestamp = new Date(date).getTime();
  const newCompensation: ICompensation = {
    id: v4(),
    date: dateTimestamp,
    value
  };
  const member = JSON.stringify(newCompensation);

  await tedisClient.zadd(
    'compensations' ,
    { [member]: dateTimestamp }
  );

  res.status(200).json(newCompensation);
}
