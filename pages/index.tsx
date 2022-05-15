import useDashboard from '../hooks/useDashboard';

export default function Home() {
  const {
    calculateLastTwelveMonthsEarnings,
    calculateLastTwelveMonthsCompensations,
    calculateNextMonthCompensation
  } = useDashboard();

  return (
    <div className="h-full flex justify-center items-center gap-10">
      <div className="rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
        <h1 className="text-primary-800 text-2xl font-bold">Last 12 months earnings</h1>
        <span className="font-bold">{calculateLastTwelveMonthsEarnings()}</span>
      </div>

      <div className="rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
        <h1 className="text-primary-800 text-2xl font-bold">Last 12 months compensations</h1>
        <span className="font-bold">{calculateLastTwelveMonthsCompensations()}</span>
      </div>

      <div className="rounded-lg shadow-md p-6 flex flex-col items-center gap-3">
        <h1 className="text-primary-800 text-2xl font-bold">Next Month's Compensation</h1>
        <span className="font-bold">{calculateNextMonthCompensation()}</span>
      </div>
    </div>
  );
}
