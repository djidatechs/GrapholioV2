
import GraphStage from "./graph_stage";
export default function Visual(){
    return (
    <div className="col-span-8 p-4 "
    style={{position:"relative" }}>
        <div className="overflow-auto scrollbar scrollbar-thumb-green-600 " 
        style={{ height: 'calc(100vh - 100px)'}}>
            <GraphStage/>
        </div>
    </div>
    )
}


