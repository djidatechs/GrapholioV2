import { Operation, useGrapholio } from "../grapholio_context"

export default function GraphSelectingTab () {
    const {Grapholio} = useGrapholio()
    const {Dashboard} = useGrapholio()
    const selectedGraph = Grapholio?.selected


    return (
        <div className="border-primary ">
            <div className="navbar ">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Graphs tabs</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn text-3xl ">+</label>

                    {(Dashboard?.graphs.length && selectedGraph?.length )
                    ?<label
                            onClick={()=>{
                                //UNSTABLE ? 
                                if (Dashboard.graphs.length == 1) Dashboard?.operate(Operation.DEFAULT)
                                Grapholio?.kill();
                                Dashboard?.next()
                            }} 
                        className="btn text-3xl "
                    >-</label>

                    :<></>
                    }

                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={()=>{
                             Grapholio?.select(Grapholio?.new(undefined,{isDirected:true}))
                             Dashboard?.operate(Operation.GRAPH_INFO)
                             Dashboard?.next()
                        }}>add directed graph</a></li>
                         <li><a onClick={()=>{
                             Grapholio?.select(Grapholio?.new(undefined,{isDirected:false}))
                             Dashboard?.operate(Operation.GRAPH_INFO)
                             Dashboard?.next()
                        }}>add undirected graph</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="overflow-x-scroll max-w-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-stone-800">
        <div className="tabs tabs-boxed flex whitespace-nowrap pb-3">
          <ul className="tabs-list">
            {
                Dashboard?.graphs.map((graph:string,index:number)=>{
                    console.log({graph,index,selectedGraph})
                    const active =  graph === selectedGraph
                    return (
                    <li 
                    onClick={()=>{ 
                        Grapholio
                        ?.select(graph)
                        Dashboard?.next()}}
                    key={index} 
                    className={`tab ${active ? 'tab-active':undefined}`}>
                        {graph}
                    </li>
                )})
            }
          </ul>
        </div>
      </div>
      </div>
    )
}