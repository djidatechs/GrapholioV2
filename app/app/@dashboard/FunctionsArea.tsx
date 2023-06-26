
"use client"
import {IoMdAddCircle} from "react-icons/io"
import {AiOutlineFunction,AiFillInfoCircle} from "react-icons/ai"
import {BsFillTerminalFill} from "react-icons/bs"
import { Operation, useGrapholio } from "../grapholio_context";
type IconType = (props: React.SVGAttributes<SVGElement>) => JSX.Element;
interface IGraphFunction {
    next?:any,
    Action? : any,
    Icon :IconType,
    text: string,
    info?: string,
    visible?:boolean|undefined

}
export default function GraphFunctions () {
    const {Grapholio} = useGrapholio()
    const {Dashboard}  = useGrapholio()
    if (!Dashboard?.graphs.length) return

    return (
        <div className="w-full p-2 ">
            <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-3">
                <GraphFunction 
                    visible={!!Grapholio?.selected?.length} 
                    Icon={IoMdAddCircle} 
                    text={"Add node "} 
                    Action={()=>Grapholio?.select()?.addNode()}
                    info="Create new node, Shortcut N"/>
                <GraphFunction 
                    visible={!!Grapholio?.selected?.length} 
                    Icon={AiOutlineFunction} 
                    text={"Algorithms"} 
                    info="Apply graph theory algorithms on your graph,   Shortcut : I"/>
                <GraphFunction 
                    visible={!!Grapholio?.selected?.length} 
                    Icon={AiFillInfoCircle} 
                    text={"Graph"} 
                    Action={()=>Dashboard?.operate(Operation.GRAPH_INFO)}
                    info="Information and control buttons,   Shortcut : G" />
                <GraphFunction 
                    visible={true} Icon={BsFillTerminalFill}
                    text={"Terminal"}
                    info="SGL terminal, if you don't know what SGL is click on Learn SGL on the navigation bar,   Shortcut : T" 
                    Action={()=>Dashboard?.operate(Operation.COMMAND_LINE)} />
                    
            </div>
        </div>
        )
}


function GraphFunction({Action,Icon, text,info,visible=false}:IGraphFunction){
    const {Dashboard}  = useGrapholio()
    if (!visible) return null
    return (
        <div 
        onClick={()=>{
            if (Action !== undefined ){
                Action()
                Dashboard?.next()
            }
            
        }}
        data-tip={info}
        className="group col-span-1 px-2 py-3 
        tooltip tooltip-right
        cursor-pointer
        text-primary hover:text-white
        text-center
        rounded-xl hover:bg-primary
        transition duration-200">
            <div>
                <Icon className={"w-8 xl:w-10 h-8 xl:h-10 mx-auto"}/>
            </div>
            <h1 className="group-hover:text-white transition duration-200
            font-bold  text-slate-200 text-sm xl:text-base ">{text}</h1>
        </div>
    )

}