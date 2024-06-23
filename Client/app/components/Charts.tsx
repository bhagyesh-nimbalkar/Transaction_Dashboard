import { useContext } from "react";
import { MonthContext } from "../../src/context/context";
import SimpleBarChart from "./BarChart";
import SimplePieChart from "./PieChart";


export  const Chart = ()=>{
    const {month} = useContext(MonthContext);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return(
        <div className='w-full sm:p-10 lg:p-20 h-full flex flex-col gap-10 items-center justify-center '>
            <h1 className='text-3xl text-center font-bold underline underline-offset-8'>Transaction Charts - {months[month-1]}</h1>
         <div className='flex sm:flex-col lg:flex-row w-full'>
            <SimpleBarChart/>
            <SimplePieChart/>
         </div>
        </div>
    )
};
