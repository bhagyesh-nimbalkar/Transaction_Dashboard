import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import {
    SeedData,
    getBar,
    getData,
    getStat
} from './../../api/api'
export const useGenerate = ()=>{
     return useQuery({
        queryKey:[QUERY_KEYS.SEED_DATA],
        queryFn:()=> SeedData()
     })
}
export const usegetData = (month:Number,search:string,page:number)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.ALL_DATA,month,search,page],
        queryFn:()=> getData(month,search,page),
        placeholderData:keepPreviousData
    })
}
export const usegetStat = (month:Number)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_STAT,month],
        queryFn:()=> getStat(month),
    })
}
export const usegetBar = (month:Number)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_BAR,month],
        queryFn:()=> getBar(month),
        enabled:!!month
    })
}