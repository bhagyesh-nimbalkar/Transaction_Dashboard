import { useContext } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { usegetBar } from '../../src/lib/tanstack/QueryAndMutation';
import { MonthContext } from '../../src/context/context';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SimplePieChart = () => {
 const {month} = useContext(MonthContext);
  const {data:Data} = usegetBar(month);
  if(!Data) return <></>
  const data = [
    { name: '0-100', value: Data[0] },
    { name: '101-200', value: Data[1]},
    { name: '201-300', value: Data[2]},
    { name: '301-400', value: Data[3] },
    { name: '401-500', value: Data[4] },
    { name: '501-600', value: Data[5]},
    { name: '601-700', value: Data[6]},
    { name: '701-800', value: Data[7] },
    { name: '801-900', value: Data[8] },
    { name: '901-Above', value: Data[9] }
  ];
  const convertData = data.filter((ele)=>ele.value>0);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={convertData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry,index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SimplePieChart;
