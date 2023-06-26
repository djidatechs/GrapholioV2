"use client"
import Konva from "konva"
import { VisualGraphsManager } from "grapholio/GlobalManager/visual_graphs_manager";
var isConnecting : string|false = false;
var movingArrow : Konva.Arrow |false = false;
export type INode = {
    id : string,
    display_name : string
    x:number,
    y:number,
    color:string,
    textColor?:string
  }

export const addNodeTextGroup = (layer: Konva.Layer , {id,display_name,x,y,color,textColor="white"}:INode,GlobalController : VisualGraphsManager) => {
    const group = new Konva.Group({
        x: x,
        y: y,
        draggable:true,
        dragBoundFunc: function(pos) {
            // define custom dragBoundFunc logic here
            var newX = Math.max(0, Math.min(layer.getStage().width() - group.width(), pos.x));
            var newY = Math.max(0, Math.min(layer.getStage().height() - group.height(), pos.y));
            return {
              x: newX,
              y: newY
            };
          }
    });
    const circle = new Konva.Circle({
        id:id,
        x:0,
        y:0,
        width:30,
        height:30,
        fill:color,
    })
    circle.on("dragstart",()=>circle.moveToTop())
    circle.on("click",(e)=>{
      circle.moveToTop()
      if (isConnecting===false){ ContextMenu(e,layer,GlobalController) ; return }
      if (GlobalController.selected){
        GlobalController.select(GlobalController.selected)?.addEdge(isConnecting ,circle.getAttr("id"),1,{color:"white",pointer:GlobalController?.GraphController()?.get(GlobalController.selected||'')?.type() == "DirectedGraph"})
        GlobalController.Dashboard().next()
        
      }
      isConnecting = false
      if (movingArrow != false) movingArrow.destroy()
      movingArrow = false
      
    })
    
    const text  = new Konva.Text({
        id:id,
        text:display_name,
        fill:textColor,
        x: 0,
        y:20,
        offsetX: 0,
        fontSize:20,
    })
    text.offsetX(text.width()/2)

    text.on("dblclick dbltap",ChangeTextVisually)
    
    group.add(circle)
    group.add(text)
    layer.add(group)
    layer.draw()
}

function ContextMenu(e:any,layer:Konva.Layer,GlobalController:VisualGraphsManager){
  var NodeContextMenu = document.getElementById("contextmenuID")
  const scale = layer.getStage().scale() || {x:1,y:1}
  if (NodeContextMenu!==null){
    document.body.removeChild(NodeContextMenu);
    return 
  }
  const Node = e.currentTarget
  var NodePosition = Node.getAbsolutePosition()
  const stage = Node.getStage()
  if (stage == undefined) return
  var stageBox = stage.container().getBoundingClientRect();
  var areaPosition = {
    x: stageBox.left + NodePosition.x,
    y: stageBox.top + NodePosition.y,
  }
  NodeContextMenu = document.createElement('div');
  NodeContextMenu.style.position = 'absolute';
  NodeContextMenu.id = 'contextmenuID';
  NodeContextMenu.style.color = 'white';
  NodeContextMenu.style.padding = "3px"
  NodeContextMenu.style.border = '2px solid white'; // Added 'solid' and fixed the border color declaration
  NodeContextMenu.style.top = areaPosition.y + -50 +'px';
  NodeContextMenu.style.left = areaPosition.x + 'px';
  NodeContextMenu.style.overflow = 'hidden';
  var ConnectButton = document.createElement("button")
  ConnectButton.id="connectBtn"
  ConnectButton.textContent="Connect"
  ConnectButton.style.padding = "3px"
  NodeContextMenu.style.overflow = 'hidden';
  NodeContextMenu.appendChild(ConnectButton)

  var DeleteButton = document.createElement("button")
  DeleteButton.id="deleteBtn"
  DeleteButton.textContent="Delete"
  DeleteButton.style.padding = "3px"
  NodeContextMenu.style.overflow = 'hidden';
  NodeContextMenu.appendChild(DeleteButton)

  document.body.appendChild(NodeContextMenu);

  
  var arrow = new Konva.Arrow({
    id:"movingarrow",
    points: [NodePosition.x, NodePosition.y, NodePosition.x, NodePosition.y],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'white',
    stroke: 'white',
    strokeWidth: 2,
    visible:false,
  });
  movingArrow = arrow
  layer.add(arrow);

  ConnectButton.addEventListener('click', function() {
    if (NodeContextMenu) document.body.removeChild(NodeContextMenu);
    isConnecting = Node.getAttr("id");
    arrow.points([NodePosition.x/scale.x, NodePosition.y/scale.y, NodePosition.x/scale.x, NodePosition.y/scale.y]);
    arrow.show()
    arrow.moveToBottom()
    layer.draw();
    GlobalController.Dashboard().next()
  });

  DeleteButton.addEventListener('click', function() {
    if (NodeContextMenu) document.body.removeChild(NodeContextMenu);
    GlobalController.select()?.removeNode(Node.getAttr("id"))
    GlobalController.Dashboard().next()
  });
  
  stage.on('mousemove', function() {
    if (isConnecting) {
      var pos = stage.getPointerPosition();
      arrow.points([NodePosition.x/scale.x, NodePosition.y/scale.y, pos.x/scale.x, pos.y/scale.y]);
      layer.draw();
    }
  });

}

function ChangeTextVisually (e:any) {
       
    const textNode = e.currentTarget
    var textPosition = textNode.getAbsolutePosition()
    const stage = textNode.getStage()

    if (stage == undefined) return
    var stageBox = stage.container().getBoundingClientRect();

    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    }
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = textNode.getAttr("text");
    textarea.style.position = 'absolute';
    textarea.style.backgroundColor = 'black';
    textarea.style.color = 'white';
    textarea.style.border = '2px solid white'; // Added 'solid' and fixed the border color declaration
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x - 20 + 'px';
    textarea.style.overflow = 'hidden';
    textarea.style.width = textNode.width().toString();
    textarea.style.resize = 'none'; // Disabled textarea resizing

    textarea.maxLength = 20; // Added maximum character limit

    textarea.focus();

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      if (e.keyCode === 13) {
        textNode.setAttr("text",textarea.value)
        textNode.offsetX(textNode.width()/2)
        document.body.removeChild(textarea);
      }
    });
}

export const removeNodeTextGroup = (layer: Konva.Layer , nodeId:string) => {
    const node = layer.find("Circle").find(node=>node.attrs.id === nodeId)
    if (node == undefined) return 
    node.parent?.remove()

    
    const edges = layer.find("Arrow")
    if (!edges.length) return 


    const edgesOfNode = edges.filter((arrow) => 
        arrow.attrs.id.includes("="+nodeId) || arrow.attrs.id.includes(nodeId+"=")
    ) as Konva.Arrow[]
    if (!edgesOfNode.length) return 
    edgesOfNode.map(edge=>edge.remove())
    layer.draw()
}