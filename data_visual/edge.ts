"use client"
import { VisualGraphsManager } from "grapholio/GlobalManager/visual_graphs_manager"
import Konva from "konva"

export type IEdge = {
    color:string,
    pointer:boolean
  }

export const addEdgeGroup = (layer: Konva.Layer , nodeId1:string, nodeId2:string ,{color,pointer} :IEdge ,GlobalController : VisualGraphsManager) => {
    const circles = layer.find("Circle");
    const node1_ = circles?.find((circle) => circle.attrs.id === nodeId1) as Konva.Circle
    const node2_ = circles?.find((circle) => circle.attrs.id === nodeId2) as Konva.Circle
    const node1_pos = node1_?.getAbsolutePosition();
    const node2_pos = node2_?.getAbsolutePosition();
    if (node1_pos == null || node2_pos == null) return;

    const dx = node1_pos.x - node2_pos.x;
    const dy = node1_pos.y - node2_pos.y;
    let angle = Math.atan2(-dy, dx);

    const radius = 20 ;

    const arrowStart = {
      x: node1_pos.x + -radius * Math.cos(angle),
      y: node1_pos.y + radius * Math.sin(angle),
    };

    const arrowEnd = {
      x: node2_pos.x + -radius * Math.cos(angle + Math.PI),
      y: node2_pos.y + radius * Math.sin(angle + Math.PI),
    };

    const arrowMiddle = {
      x: (arrowStart.x + arrowEnd.x) / 2,
      y: (arrowStart.y + arrowEnd.y) / 2,
    };
    const scale = layer?.getStage().scale() || {x:1,y:1}

    const Edge = new Konva.Arrow({
        id:nodeId1+"="+nodeId2,
        points:[
            arrowStart.x / scale.x  ,
            arrowStart.y / scale.y ,
            arrowMiddle.x / scale.x ,
            arrowMiddle.y / scale.y ,
            arrowEnd.x / scale.x ,
            arrowEnd.y / scale.y ,
            ],
        stroke:color,
        fill:color,
        strokeWidth:3,
        pointerWidth:pointer ? 6 : 0,
    })
    node1_?.parent?.on("dragmove", ()=>updatePoints(layer,node1_,node2_,Edge))
    node2_?.parent?.on("dragmove", ()=> updatePoints(layer,node1_,node2_,Edge))
    Edge.on("mouseover",(e)=>{
      Edge.fill(color=="yellow"?"white":"yellow")
      Edge.stroke(color=="yellow"?"white":"yellow")
      layer.draw()
    })
    Edge.on("mouseout",(e)=>{
      Edge.fill(color)
      Edge.stroke(color)
      layer.draw()

    })
    Edge.on("dblclick",()=>{
      console.log("dblclick")
      
      GlobalController.select()?.removeEdge(nodeId1,nodeId2)
      GlobalController.Dashboard().next()

    })

    
    layer.add(Edge)
    console.log(Edge)

    layer.draw()
}



export const updatePoints = (layer:Konva.Layer , node1_:Konva.Circle, node2_:Konva.Circle , ArrowtoUpdate : Konva.Arrow   ) => {
    const node1_pos = node1_?.getAbsolutePosition();
    const node2_pos = node2_?.getAbsolutePosition();
    if (node1_pos == null || node2_pos == null) return;
    const dx = node1_pos.x - node2_pos.x;
    const dy = node1_pos.y - node2_pos.y;
    let angle = Math.atan2(-dy, dx);
    const radius = 20;
    const arrowStart = {
      x: node1_pos.x + -radius * Math.cos(angle),
      y: node1_pos.y + radius * Math.sin(angle),
    };
    const arrowEnd = {
      x: node2_pos.x + -radius * Math.cos(angle + Math.PI),
      y: node2_pos.y + radius * Math.sin(angle + Math.PI),
    };
    const arrowMiddle = {
      x: (arrowStart.x + arrowEnd.x) / 2,
      y: (arrowStart.y + arrowEnd.y) / 2,
    };
    const scale = layer.getStage().scale() || {x:1,y:1}
        ArrowtoUpdate.setAttr("points", [
        arrowStart.x / scale.x  ,
        arrowStart.y / scale.y ,
        arrowMiddle.x / scale.x ,
        arrowMiddle.y / scale.y ,
        arrowEnd.x / scale.x ,
        arrowEnd.y / scale.y ,
        ])
        return null
  };

export const removeEdgeGroup = (layer: Konva.Layer , nodeId1:string, nodeId2:string) => {
    const edges = layer.find("Arrow")
    if (!edges.length ) return
    const edge = edges.find((arrow) => arrow.attrs.id === nodeId1+"="+nodeId2) as Konva.Arrow
    console.log("there are edge ? ",edges,nodeId1,nodeId2)
    if (edge) edge.remove()
    layer.draw()
}