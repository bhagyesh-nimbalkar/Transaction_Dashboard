import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./../../src/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./../../src/components/ui/select";
import { IoIosSearch } from "react-icons/io";
import { usegetData } from "../../src/lib/tanstack/QueryAndMutation";
import { Button } from "./../../src/components/ui/button"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";

type DataTypes = {
    id:Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
};
import { Input } from "../../src/components/ui/input";
import {useContext } from "react";
import { MonthContext } from "../../src/context/context";

export const List = ()=>{
    const {month,setMonth,search,setSearch,pagination,setPagination} = useContext(MonthContext);
    const {data:Data,isPending} = usegetData(month,search,pagination);
    const {data:Data2} = usegetData(month,search,pagination+1);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    console.log(Data);
    if(!Data || !Data2) return <></>;
    const list = Data;
    const handleChangeSearch = (y:String)=>{
        setSearch(y);
        setPagination(0);
    }
    const handleChangeMonth = (x:String)=>{
         setMonth(Number(x));
         setPagination(0);
    }
    const prevDisable = pagination==0;
    console.log(month,search,pagination);
    return(
        <div className='w-full sm:p-10 lg:p-30 h-full flex flex-col gap-10 items-center justify-center'>
        <h1 className='text-3xl text-center font-bold underline underline-offset-8'>Transaction Dashboard</h1>
        <div className='flex justify-between w-full px-10'>
             <div className='flex items-center'>
                 <IoIosSearch className="translate-x-7 text-xl"/><Input type="email" placeholder="Search Transactions" className='shaodow-lg px-10' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChangeSearch(e.target.value.toString())} value={search}/>
              </div>
              <div>
                <Select onValueChange={handleChangeMonth}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Mar" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((ele,index)=>{
                        return <SelectItem value={(index+1).toString()}>{ele}</SelectItem>
                    })}
                </SelectContent>
                </Select>
              </div>
        </div>
        <Table className={`shadow-lg border-collapse rounded-xl border-2 ${isPending?'opacity-90':'opacity-100'}`} >
        <TableHeader>
            <TableRow className='bg-slate-400 hover:bg-slate-400'>
            <TableHead className=" text-white font-bold text-left">ID</TableHead>
            <TableHead className='text-white font-bold text-center'>Title</TableHead>
            <TableHead className='text-white font-bold text-center'>Description</TableHead>
            <TableHead className="text-white font-bold text-center">Price</TableHead>
            <TableHead className="text-white font-bold text-center">Sold</TableHead>
            <TableHead className="text-white font-bold text-center">Image</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
                 {(list===undefined || list===null)?"No Data Found":
                    list.map((ele:DataTypes)=>{
                    return (
                     <TableRow>
                        <TableCell>{ele.id.toString()}</TableCell>
                        <TableCell>{ele.title.toString()}</TableCell>
                        <TableCell>{ele.description.toString()}</TableCell>
                        <TableCell>{ele.price.toString()}</TableCell>
                        <TableCell>{ele.sold.toString()}</TableCell>
                        <TableCell><img className='w-20 h-14' src={ele.image.toString()}></img></TableCell>
                    </TableRow>
                    )
                    })
                 }
        </TableBody>
        </Table>
        <div className='flex justify-between items-center w-full'>
              <div>
                   <h3 className='text-gray-500 text-sm'>Page  Number: {pagination+1}</h3>
              </div>
              <div className='flex gap-5'>
                 <Button variant="outline" className={`flex gap-2 active:bg-gray-200`} onClick={()=>setPagination((pagination:number)=>pagination-1)} disabled={prevDisable}><MdOutlineKeyboardArrowLeft/> Previous</Button>
                 <Button variant="outline" className='flex gap-2 active:bg-gray-200' onClick={()=>setPagination((pagination:number)=>pagination+1)} disabled={Data2===undefined || Data2.length===0}>Next <MdOutlineKeyboardArrowRight/></Button>
              </div>
        </div>
        </div>
    )
}