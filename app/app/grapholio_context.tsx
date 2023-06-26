"use client"
import {  Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { VisualGraphsManager } from "grapholio/GlobalManager/visual_graphs_manager";
export enum Operation {
    DEFAULT="DEFAULT",
    ALGORITHM="ALGORITHM",
    GRAPH_INFO="GRAPH_INFO",
    COMMAND_LINE="COMMAND_LINE",

}
export type DashbaordValue={
    graphs: string[],
    setGraphs: Dispatch<SetStateAction<string[]>>,
    yielding: number,
    next: () => void,
    operation: Operation,
    operate : Dispatch<SetStateAction<Operation>>,
}
export type GrapholioContext = {
    Grapholio? : VisualGraphsManager,
    Dashboard? : DashbaordValue
}
export const Grapholio = createContext<GrapholioContext>({})

export default function GrapholioContextProvider ({children}:{children:React.ReactNode}){

    const [VGManager , setVisualGraphsManager] = useState<VisualGraphsManager>()
    const [dashboardSync, setDashboardSync] = useState<number>(1)
    const [graphs,setGraphs] = useState<string[]>([])
    const [operation,setOperation] = useState<Operation>(Operation.DEFAULT)

    useEffect(()=>{
            const container = document.getElementById("stage_container") as HTMLDivElement;
            const init_visual_graph = new VisualGraphsManager(container,{
                graphs,
                setGraphs,
                yielding:dashboardSync,
                next : ()=>setDashboardSync(c=>c+1),
                operation,
                operate : (o)=>setOperation(o),
            }
        )
            setVisualGraphsManager(init_visual_graph)

    },[])
    
    return (
        
        <Grapholio.Provider value={{
            Grapholio : VGManager,
            Dashboard : {
                graphs,
                setGraphs,
                yielding:dashboardSync,
                next : ()=>setDashboardSync(c=>c+1),
                operation,
                operate : (o)=>setOperation(o),
            }
        }}>
            {children}
        </Grapholio.Provider>
    )
}

export const useGrapholio = () => {
    const GrapholioClient = useContext(Grapholio)
    return GrapholioClient
}