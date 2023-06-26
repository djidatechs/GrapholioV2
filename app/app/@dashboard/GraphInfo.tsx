import { useGrapholio } from "../grapholio_context"

export default function GraphInfo (){
    const {Grapholio} = useGrapholio()
    const connected = Grapholio?.select()?.LogicGraph()?.isConnected()
    const Nnodes = Grapholio?.select()?.LogicGraph()?.getNumNodes()
    const Nedges = Grapholio?.select()?.LogicGraph()?.getNumEdges()
    return (
        <div className="overflow-auto p-2 w-full ">
        <table className="table table-zebra">
            <thead>
            <tr>
                <th>Property</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Connexe</td>
                <td>{connected}</td>
            </tr>
            <tr>
                <td>N&deg; Nodes </td>
                <td>{Nnodes}</td>
            </tr>
            <tr>
                <td>NN&deg; Edges</td>
                <td>{Nedges}</td>
            </tr>
            </tbody>
        </table>
        </div>
    )
}