"use client"

import { useGrapholio } from "../grapholio_context"

export default function Zoom(){
    const {Grapholio} = useGrapholio()
    return (
        <div className="z-50 absolute text-black font-bold select-none">
                <span onClick={()=>{
                    Grapholio?.stageController().ZoomOut()
                }} className="py-1 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">-</span>
                <span onClick={()=>{
                    Grapholio?.stageController().ZoomIn()
                }}  className="py-1 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">+</span>
        </div>
    )
}