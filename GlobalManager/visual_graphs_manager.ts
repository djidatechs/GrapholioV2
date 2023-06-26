import { StageController } from "grapholio/data_visual/stage";
import { VisualGraph } from "./visual_graph";
import Konva from "konva";
import { DashbaordValue, Operation} from "grapholio/app/app/grapholio_context";

export class VisualGraphsManager {
    protected visual_graphs : Map<string,VisualGraph> 
    public selected : string | undefined;
    protected stage_controller : StageController 
    protected dashboard_ref : DashbaordValue


    constructor(container:HTMLDivElement, dashboard :DashbaordValue){
        this.stage_controller = new  StageController (container,this)
        this.visual_graphs= new Map<string,VisualGraph>  
        this.dashboard_ref = dashboard

    }
    new( graph_name : string = "graph "+VisualGraph.visual_graph_id , {isDirected} : {isDirected:boolean} ){
        this.GraphController().set(graph_name,new VisualGraph(graph_name,{isDirected}, this.stageController() ))
        this.stageController().newLayer(graph_name)
        return graph_name
    }
    select(name:string=""){
        if (this.selected == undefined && name ==="") return console.log("")
        if (this.selected?.length && name ==="") return this.GraphController().get(this.selected) // dont need to change the layer
        if (name == this.selected) return this.GraphController().get(this.selected) // dont need to change the layer
        if (name !== this.selected){
            this.stageController().active_layer.hide()
            console.log(this.stageController().active_layer)
            this.stageController().active_layer = this.stageController().stage.find("Layer")?.find((layer) => layer.attrs.id === name) as Konva.Layer
            console.log(this.stageController().active_layer)
            this.stageController().active_layer.show()
            this.stageController().active_layer.moveToTop()
            this.stageController().stage.batchDraw();
            this.selected=name
            
            return this.GraphController().get(name)
        }
    }
    
    stageController(){
        return this.stage_controller
    }
    GraphController(){
        return this.visual_graphs
    }
    Dashboard(){
        return this.dashboard_ref
    }
    clearAll(){
        this.GraphController().clear()
        this.stageController().reset()
    }
    run(func:any){
        func(this)
    }
    kill(){
            let flag = this.GraphController().delete(this.selected||"")
            if (!flag) return 
            let ac = this.stageController().active_layer
            let goto_layer = Array.from(this.visual_graphs.keys()).length ? Array.from(this.visual_graphs.keys())[0] : "rootLayer"
            this.stageController().active_layer = this.stageController().stage.find("Layer")?.find((layer) => layer.attrs.id === goto_layer) as Konva.Layer
            this.stageController().active_layer.show()
            this.stageController().active_layer.moveToTop()
            this.stageController().stage.batchDraw();
            this.selected=goto_layer
            ac.destroy()
    }   
}
