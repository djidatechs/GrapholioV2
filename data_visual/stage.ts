"use client"
import Konva from "konva"
import { type INode, addNodeTextGroup, removeNodeTextGroup } from "./node";
import { type IEdge, addEdgeGroup, removeEdgeGroup } from "./edge";
import { VisualGraphsManager } from "grapholio/GlobalManager/visual_graphs_manager";
//independent of graph theory constrants
export class StageController {
    static node_counter : number = 0
    public stage : Konva.Stage 
    public active_layer : Konva.Layer 
    public global : VisualGraphsManager
    protected MovingArrow : any
    constructor(container:HTMLDivElement, global : VisualGraphsManager){
        var stage = new Konva.Stage({
            container,
            width:  2*window.innerWidth,
            height: 1.5*window.innerHeight
        });
        this.stage = stage.getStage()
        console.log(this.stage)
        var layer = new Konva.Layer();
        layer.setAttr("id","rootLayer")
        this.active_layer = layer.getLayer()
        console.log('added layer')
        this.stage.add(this.active_layer);
        this.global = global

    }
    addNode(Node:INode){
        addNodeTextGroup(  this.active_layer ,   Node , this.global )
        return this.global.select()
    }
    console() {
        console.log(this.active_layer)
    }
    addEdge(nodeId1:string,nodeId2:string, Edge:IEdge){
        addEdgeGroup(this.active_layer,nodeId1,nodeId2,Edge , this.global )
        return this.global.select()
    }
    deleteNode(nodeId:string){
        removeNodeTextGroup(this.active_layer,nodeId)
        return this.global.select()
    }
    deleteEdge(nodeId1:string,nodeId2:string){
        console.log("deleting stage edge")
        removeEdgeGroup(this.active_layer,nodeId1,nodeId2)
        return this.global.select()
    }
    


    ZoomOut (){
        const currentScale = this.stage.scale()
        if (currentScale == undefined) return
        this.stage.scaleX(currentScale.x-0.1 < 0.5 ? 0.5 : currentScale.x-0.1)
        this.stage.scaleY(currentScale.y-0.1 < 0.5 ? 0.5 : currentScale.y-0.1)
        this.stage.draw();
    }
    ZoomIn  (){
        const currentScale = this.stage.scale()
        if (currentScale == undefined) return
        this.stage.scaleX(currentScale.x+0.1 > 1.3 ? 1.3 : currentScale.x+0.1)
        this.stage.scaleY(currentScale.y+0.1 > 1.3 ? 1.3 : currentScale.y+0.1)
        this.stage.draw();
        
    }
    import(data:string){
        this.active_layer = Konva.Layer.create(JSON.parse(data))
        this.stage.destroyChildren()
        this.stage.add(this.active_layer);
    }
    export(){}
    reset(){
        this.active_layer.destroyChildren()
    }

    newLayer(id:string){
        var layer = new Konva.Layer()
        layer.setAttr("id",id)
        this.stage.add(layer)
    }
    updateNode(id: string  , update : IUpdateNode){
        const node = this.active_layer.find("Circle").find(node=>node.attrs.id === id)
        const text = this.active_layer.find("Text").find(text=>text.attrs.id === id)
        if (update.display_name ) text?.setAttr("text",update.display_name )
        if (update.x) node?.x(update.x)
        if (update.y) node?.y(update.y)
        if (update.color) node?.setAttr("fill",update.color)
        if (update.textColor) node?.setAttr("fill",update.textColor)


        
    }
    updateEdge(id: string  ,{}){

    }

} 

interface IUpdateNode  {
    display_name : string
    x:number,
    y:number,
    color:string,
    textColor?:string
  }
