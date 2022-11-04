import { Node as ReaflowNode, NodeProps as ReaflowNodeProps } from "reaflow";
import { nodeConfig } from "../Config/Config";
import { NodeContent } from "./NodeContent";
// import * as css from "./style";
import './overview.css';



const NodeStats = ({ showStats, stats }) =>
    showStats && stats ? (
        <ul className={'NodeStats'}>
            {Object.entries(stats).map(([label, count]) => (
                <li key={label}>
                    <span>{label}</span>
                    <strong>{count}</strong>
                </li>
            ))}
        </ul>
    ) : null;




// const renderNodeContent = ({ node, disabled, selected, onAddClick, onNodeClick }) => {
//     return (
//         {/*<foreignObject x={0} y={0} width={node.width} height={node.height}>*/ }
//         < div className = { 'NodeWrapper'} >
//             <NodeContent
//                 selected={selected}
//                 id={node.id}
//                 data={node.data}
//             // onClick={onNodeClick ? () => onNodeClick(node) : undefined}
//             />

//     {/* Add Button 
//             {node.data?.type === "end" ? null : (
//                 <div className={'AddButton'}>
//                     <Button
//                         disabled={disabled}
//                         size="middle"
//                         shape="circle"
//                         icon={<PlusOutlined />}
//                         onClick={onAddClick ? () => onAddClick(node) : undefined}
//                     />
//                 </div>
//             )}*/}
//             </ >
//     {/* </foreignObject>*/ }
//         )
// };


export const Node = ({ node }) => {
    return (
        <ReaflowNode removable={false} selectable={false} className={'NodeStyleReset'} {...node} style={{ fill: 'transparent' }} animated draggable   >
            {(event) => (<NodeContent data={event} />)}
        </ReaflowNode>
    )
}


