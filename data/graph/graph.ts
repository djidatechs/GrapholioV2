type EdgeColor = string;
type Weight = number;

type Adjacents =  Map<string, Weight >

export abstract class Graph {
  protected adjacencyList: Map<string, Adjacents>;
  protected name : string

  constructor(name:string) {
    this.adjacencyList = new Map<string, Adjacents>();
    this.name=name
  }

  addVertex(vertex: string): boolean {
    if (this.adjacencyList.has(vertex)) return false
    this.adjacencyList.set(vertex, new Map<string, Weight >() )
    return true
    
  }

  addEdge(vertex1: string, vertex2: string, weight: Weight = 1): boolean {
    if (!this.adjacencyList.has(vertex1) || !this.adjacencyList.has(vertex2)) return false
    this.adjacencyList.get(vertex1)!.set(vertex2, weight );
    return true 
  }

  removeEdge(vertex1: string, vertex2: string): boolean {
      if (!this.adjacencyList.has(vertex1) || !this.adjacencyList.has(vertex2)) return false    
      this.adjacencyList.get(vertex1)!.delete(vertex2)
      return true
  }

  removeVertex(vertex: string): boolean {
    if (!this.adjacencyList.has(vertex)) return false
    this.adjacencyList.delete(vertex);
    for (const [, Adjacents] of this.adjacencyList as any ) Adjacents.delete(vertex)
    return true
  }


  getVertices(): string[] {
    return Array.from(this.adjacencyList.keys());
  }

  getEdges(vertex: string) :any {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error('Vertex does not exist in the graph.');
    }

    const edges = this.adjacencyList.get(vertex)!
    return Array.from(edges.entries()).map(([adjVertex, weight ]) => ({
      vertex,
      weight,
    }));
  }

  getNumNodes(): number {
    return this.adjacencyList.size;
  }
  getNumEdges(): number {
    let count = 0;
    for (const adjacents of this.adjacencyList.values() as any) {
      count += adjacents.size;
    }
    return count / (this instanceof UndirectedGraph ? 2 : 1);
  }
  isConnected(): string {
    const vertices = this.getVertices();
    if (vertices.length === 0) return "empty graph";
  
    const visited: Set<string> = new Set();
    const stack: string[] = [];
    stack.push(vertices[0]);
  
    while (stack.length > 0) {
      const vertex = stack.pop()!;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const edges = this.adjacencyList.get(vertex)!;
        for (const adjVertex of edges.keys() as any) {
          stack.push(adjVertex);
        }
      }
    }
  
    return visited.size === vertices.length ? "yes" : "no";
  }
  

  printGraph(): void {
    for (const [vertex, Adjacents] of this.adjacencyList as any) {
      const formattedEdges = Array.from(Adjacents.entries())
        .map(([adjVertex, weight] :any) => `${adjVertex}  ${weight}`)
        .join(', ');
      console.log(`${vertex} -> ${formattedEdges}`);
    }
  }
}

export class UndirectedGraph extends Graph {
  addEdge(vertex1: string, vertex2: string, weight: Weight = 1, edgeColor: EdgeColor = 'black'): boolean {
    if (  ! super.addEdge(vertex1, vertex2, weight) ) return false
    this.adjacencyList.get(vertex2)!.set(vertex1,  weight );
    return true
  }

  removeEdge(vertex1: string, vertex2: string): boolean {
    if (! super.removeEdge(vertex1, vertex2)  ) return false
    this.adjacencyList.get(vertex2)!.delete(vertex1)
    return true
  }
}

export class DirectedGraph extends Graph {
    addEdge(vertex1: string, vertex2: string, weight: Weight = 1, edgeColor: EdgeColor = 'black'): boolean {
      if (!this.adjacencyList.has(vertex1) || !this.adjacencyList.has(vertex2)) return false
      this.adjacencyList.get(vertex1)!.set(vertex2, weight );
      return true
    }
  
    removeEdge(vertex1: string, vertex2: string): boolean {
      if (!this.adjacencyList.has(vertex1) || !this.adjacencyList.has(vertex2)) return false
      this.adjacencyList.get(vertex1)!.delete(vertex2)
      return true
    }
  }
  