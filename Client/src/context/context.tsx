import { createContext, useState, FC, ReactNode} from 'react';

interface MonthContextType {
  month: number;
  search:String;
  pagination:number;
  setMonth: (month: number) => void;
  setSearch: (search:string) => void;
  setPagination:(pagination:number) => void;
}

const MonthContext = createContext<MonthContextType | undefined>(undefined);


const MonthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [month, setMonth] = useState<number>(3);
  const [search, setSearch] = useState<string>('');
  const [pagination, setPagination] = useState<number>(0);
  return (
    <MonthContext.Provider value={{ month, setMonth, search, setSearch,pagination,setPagination}}>
      {children}
    </MonthContext.Provider>
  );
};

export { MonthContext, MonthProvider };
