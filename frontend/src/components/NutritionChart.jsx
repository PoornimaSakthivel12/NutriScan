import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const NutritionChart = ({ data }) => {
  const chartData = data.map((item, index) => ({
    name: item.name,
    value: item.value,
    fill: item.color,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={10} data={chartData}>
          <RadialBar minAngle={15} background clockWise dataKey="value" />
          <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '12px' }} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;
