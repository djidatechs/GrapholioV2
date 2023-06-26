import { DirectedGraph, Graph, UndirectedGraph } from "grapholio/data/graph/graph"
import { IEdge } from "grapholio/data_visual/edge"
import { INode } from "grapholio/data_visual/node"
import { StageController } from "grapholio/data_visual/stage"

export class VisualGraph {
    static visual_graph_id : number = 1
    protected logic_graph : Graph
    protected stage_graph : StageController
    constructor(
        graph_name : string, 
        {isDirected} : {isDirected:boolean},
        stage_graph : StageController
    ){
        this.logic_graph = isDirected ?  new DirectedGraph(graph_name) : new UndirectedGraph(graph_name)
        this.stage_graph=stage_graph
        ++VisualGraph.visual_graph_id
    }
    addNode(node? : INode){
        let n = node
        if (node==undefined){
            const psudo_id = ++StageController.node_counter
            const color = getRandomHexColor()
            n = {
                x:Math.floor(Math.random() * (300 - 100 + 1)) + 100,
                y:Math.floor(Math.random() * (300 - 100 + 1)) + 100,
                color:color,
                id: "grapholio_auto_action_"+psudo_id.toString(),
                display_name:psudo_id.toString(),
                textColor:color
            } as INode
        }
        if (n != undefined)
        if (this.logic_graph.addVertex(n.id))
            return this.stage_graph.addNode(n)
    }
    addEdge(id1:string,id2:string,weight:number,edge:IEdge) {
        if (this.logic_graph.addEdge(id1,id2,weight))
            return this.stage_graph.addEdge(id1,id2,edge)
    }
    removeNode(id:string){
        if (this.logic_graph.removeVertex(id))
            return this.stage_graph.deleteNode(id)
    }
    removeEdge(id1:string,id2:string){
        if (this.logic_graph.removeEdge(id1,id2)){
            console.log("yes")
            return this.stage_graph.deleteEdge(id1,id2)
        }
        console.log("no")
    }
    type (){
        return this.logic_graph?.constructor?.name
    }
    LogicGraph(){
        return this.logic_graph
    }
    
   
}

function getRandomHexColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
  
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    return color;
  }
  