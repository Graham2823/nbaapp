import { createRouter } from 'next-connect';
import cors from 'cors';

const bettingOdds = createRouter();

bettingOdds.get(async (req, res) => {

  try {
    const response = await fetch(process.env.BETTING_ODDS_API);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default async (req, res) => {
  await bettingOdds.run(req, res);
};
