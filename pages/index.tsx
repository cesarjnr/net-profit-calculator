import useDashboard from '../hooks/useDashboard';

interface Card {
  title: string;
  content: string;
}

export default function Home() {
  const {
    getLastTwelveMonthsEarnings,
    getLastTwelveMonthsCompensations,
    getNextMonthGrossCompensation,
  } = useDashboard();
  const cards: Card[] = [
    { title: 'Last 12 months earnings', content: getLastTwelveMonthsEarnings() },
    { title: 'Last 12 months compensations', content: getLastTwelveMonthsCompensations() },
    { title: 'Next Month\'s Gross Compensation', content: getNextMonthGrossCompensation() }
  ];

  return (
    <div className="h-full flex justify-center items-center gap-10">
      {cards.map((card) => (
        <div key={card.title} className="bg-primary-800 rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
          <h1 className="text-secondary-400 text-2xl font-bold">{card.title}</h1>
          <span className="text-white font-bold">{card.content}</span>
        </div>
      ))}
    </div>
  );
}
