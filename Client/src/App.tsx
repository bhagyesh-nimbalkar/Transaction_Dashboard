import { FC} from "react";
import { List} from "../app/components/List";
import {Stat} from './../app/components/Stats';
import { useGenerate } from "./lib/tanstack/QueryAndMutation";
import { Chart } from "../app/components/Charts";

const App:FC = ()=> {
  useGenerate();
  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
          <List/>
          <Stat/>
          <Chart/>
    </div>
  )
}

export default App;
