"use client"
import { useEffect } from "react"
import { useGrapholio } from "../grapholio_context"

export default function StageNavBar(){
    return(
        <div className="z-50 absolute text-black font-bold select-none left-1/2">
                <span className="py-1 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">-</span>
                <span className="py-1 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">+</span>
        </div>
    )
}