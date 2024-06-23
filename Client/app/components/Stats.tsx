import { useContext } from "react";
import { MonthContext } from "../../src/context/context";
import { usegetStat } from "../../src/lib/tanstack/QueryAndMutation";

export  const Stat = ()=>{
    const {month} = useContext(MonthContext);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const {data:Data} = usegetStat(month);
    console.log(Data);
    if(!Data) return <></>;
    return(
        <div className='w-full sm:p-10 lg:p-20 h-full flex flex-col gap-10 items-center justify-center '>
            <h1 className='text-3xl text-center font-bold underline underline-offset-8'>Transaction Statistics - {months[month-1]}</h1>
            <div className='p-20 shadow-2xl rounded-lg w-[60%] border-2 bg-gradient-to-br from-yellow-200 to-purple-300'>
                 <ul className='flex flex-col gap-3'>
                     <li className='font-semibold text-black'>Total Sale: {Data.length}</li>
                     <li className='font-semibold text-black'>Total Sold item: {Data.Sold}</li>
                     <li className='font-semibold text-black'>Total not Sold item: {Data.NotSold}</li>
                 </ul>
            </div>
        </div>
    )
};
