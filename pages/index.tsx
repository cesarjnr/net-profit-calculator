import useDashboard from '../hooks/useDashboard';

interface Card {
  title: string;
  content: string;
}

export default function Home() {
  const {
    calculateLastTwelveMonthsEarnings,
    calculateLastTwelveMonthsCompensations,
    calculateNextMonthCompensation
  } = useDashboard();
  const cards: Card[] = [
    { title: 'Last 12 months earnings', content: calculateLastTwelveMonthsEarnings() },
    { title: 'Last 12 months compensations', content: calculateLastTwelveMonthsCompensations() },
    { title: 'Next Month\'s Compensation', content: calculateNextMonthCompensation() }
  ];

  return (
    <div className="h-full flex justify-center items-center gap-10">
      {cards.map((card) => (
        <div className="bg-primary-800 rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
          <h1 className="text-secondary-400 text-2xl font-bold">{card.title}</h1>
          <span className="text-white font-bold">{card.content}</span>
        </div>
      ))}
    </div>
  );
}
