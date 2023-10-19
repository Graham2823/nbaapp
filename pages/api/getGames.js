import { createRouter } from 'next-connect';

const gamesRouter = createRouter();

gamesRouter.get(async (req, res) => {
    let date = new Date();
    let todaysDate =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString; // This line doesn't have an effect, it's missing the assignment.
    const yesterdayArr = yesterday.toDateString().split(' ');
    const yesterdaysDate = `${yesterdayArr[3]}-${yesterdayArr[1]}-${yesterdayArr[2]}`;

    try {
        const tscoresResponse = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2023&start_date=2023-10-25&end_date=2023-10-25`);
        const yscoresResponse = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2023&start_date=2023-10-24&end_date=2023-10-24`);
        
        if (tscoresResponse.status !== 200 || yscoresResponse.status !== 200) {
            res.status(404).json({ message: "Data is not available" });
            return;
        }
        
        const tscoresData = await tscoresResponse.json();
        const yscoresData = await yscoresResponse.json();
        
        const tscores = tscoresData.data;
        const yscores = yscoresData.data;
        
        if (tscores.length === 0 || yscores.length === 0) {
            res.status(404).json({ message: "Data is not available" });
        } else {
            res.json({ tscores, yscores });
        }
    } catch (err) {
        console.log(err);
    }
});

export default async (req, res) => {
    await gamesRouter.run(req, res);
};
