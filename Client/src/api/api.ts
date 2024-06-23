export const SeedData = async ()=>{
  try{
     await fetch('http://localhost:3000');
  }catch(err){
     console.log(err);
     throw err;
  }
}
export const getData = async(x:Number,y:string='',page:number=0)=>{
     try{
          return await fetch(`http://localhost:3000/get_all?month=${x}&search=${y}&page=${page}`).then(res=>res.json());
       }catch(err){
          console.log(err);
          throw err;
       }
}
export const getStat = async(x:Number)=>{
   try{
        return await fetch(`http://localhost:3000/get_stat?month=${x}`).then(res=>res.json());
     }catch(err){
        console.log(err);
        throw err;
     }
}
export const getBar = async(x:Number)=>{
   try{
        return await fetch(`http://localhost:3000/get_bar?month=${x}`).then(res=>res.json());
     }catch(err){
        console.log(err);
        throw err;
     }
}