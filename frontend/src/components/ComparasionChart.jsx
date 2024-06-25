import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sun", thisWeek: 250000, lastWeek: 50000 },
  { day: "Mon", thisWeek: 50000, lastWeek: 50000 },
  { day: "Tue", thisWeek: 10000, lastWeek: 25000 },
  { day: "Wed", thisWeek: 20000, lastWeek: 20000 },
  { day: "Thu", thisWeek: 10000, lastWeek: 30000 },
  { day: "Fri", thisWeek: 250000, lastWeek: 50000 },
  { day: "Sat", thisWeek: 50000, lastWeek: 50000 },
];

const WeeklyComparisonChart = () => {
  return (
    <div className="mt-6">
      <h1 className="text-neutral text-[22px]">Recent Transaction</h1>
      <div className="p-4 bg-white rounded-lg shadow-md w-[728px]">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Weekly Comparison</h2>
          <div className="flex gap-6 ">
            <div className="flex gap-2 items-center">
              <span className="w-4 h-2 bg-primary"></span>
              <p className="text-xs">This week</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-4 h-2 bg-[#E8E8E8]"></span>
              <p className="text-xs">Last week</p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={258}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="lastWeek" fill="#E5E5E5" name="Last week" />
            <Bar dataKey="thisWeek" fill="#00C9A7" name="This week" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyComparisonChart;
