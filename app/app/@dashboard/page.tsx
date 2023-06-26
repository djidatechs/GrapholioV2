"use client"
import { useEffect, useState } from "react"
import { Operation, useGrapholio } from "../grapholio_context"
import GraphSelectingTab from "./Graph_selecting_tab"
import GraphFunctions from "./FunctionsArea"
import GraphInfo from "./GraphInfo"
import Terminal from "./Terminal"

export default function Dashboard(){
    const {Grapholio} = useGrapholio()
    const {Dashboard} = useGrapholio()

    
    useEffect(()=>{
        const keys = Grapholio?.GraphController().keys()
        if (keys) {
            Dashboard?.setGraphs(Array.from(keys))
        }
    },[Dashboard?.yielding])
    return (
    <div className="col-span-4 text-white p-2 ">
        <GraphSelectingTab />
        <GraphFunctions />
        {
            Dashboard?.operation == Operation.DEFAULT
            ? <></>
            : Dashboard?.operation == Operation.GRAPH_INFO
            ? <GraphInfo/>
            : Dashboard?.operation == Operation.COMMAND_LINE
            ? <Terminal/>
            : undefined

        }
    </div>
    )
}