import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { usegetBar } from '../../src/lib/tanstack/QueryAndMutation';
import { useContext, useEffect } from 'react';
import { MonthContext } from '../../src/context/context';


const SimpleBarChart = () => {
    const {month} = useContext(MonthContext);
    const {data:Data} = usegetBar(month);
    if(!Data) return <></>
    console.log(Data);
    const Data2 = [
      {
        name: '0-100',
        items: Data[0],
      },
      {
        name: '101-200',
        items: Data[1]
      },
      {
        name: '201-300',
        items: Data[2]
      },
      {
        name: '301-400',
        items: Data[3]
      },
      {
        name: '401-500',
        items: Data[4]
      },
      {
        name: '501-600',
        items: Data[5]
      },
      {
        name: '601-700',
        items: Data[6]
      },
      {
        name: '701-800',
        items: Data[7]
      },
      {
        name: '801-900',
        items: Data[8]
      },
      {
        name: '901-Above',
        items: Data[9]
      }
    ];
    
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        barCategoryGap={50}
        width={500}
        height={300}
        data={Data2}
        margin={{
          top: 50,
          right: 50,
          left: 50,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="items" fill="#63b4dd"/>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;
