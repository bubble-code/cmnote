import { Node as ReaflowNode, NodeProps as ReaflowNodeProps } from "reaflow";
import { nodeConfig } from "./Config";
import { Badge, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// import * as css from "./style";

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


const NodeContent = ({ id, selected, onClick, data }) => {
    const type = data.type || "source";
    const title = data.title || "Node Title";
    const description = data.description || "Node Description";

    const { color, icon } = nodeConfig(type);

    return (
        <div className={NodeContent} style={{ color }} onClick={onClick} aria-selected={selected} >
            <Badge dot={data.showError}>
                <div className={'NodeIcon'}>{icon}</div>
            </Badge>
            <div className={'NodeDetails'}>
                <h1>
                    {title} {id}
                </h1>
                <p>{description}</p>
            </div>
            <NodeStats stats={data?.stats} showStats={data.showStats} />
        </div>
    );
};

const renderNodeContent = ({ node, disabled, selected, onAddClick, onNodeClick }) => (
    <foreignObject x={0} y={0} width={node.width} height={node.height}>
        <div className={'NodeWrapper'}>
            <NodeContent
                selected={selected}
                id={node.id}
                data={node.data}
                onClick={onNodeClick ? () => onNodeClick(node) : undefined}
            />

            {/* Add Button */}
            {node.data?.type === "end" ? null : (
                <div className={'AddButton'}>
                    <Button
                        disabled={disabled}
                        size="middle"
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={onAddClick ? () => onAddClick(node) : undefined}
                    />
                </div>
            )}
        </div>
    </foreignObject>
);


export const Node = ({ selectedId, onAddClick, onNodeClick, ...props }) => (
    <ReaflowNode
        {...props}
        removable={false}
        selectable={false}
        className={'NodeStyleReset'}
    >
        {(event) => {
            const isDisabled = event.node.disabled;
            const isSelected = selectedId === event.node.id;

            return renderNodeContent({
                ...event,
                disabled: isDisabled,
                selected: isSelected,
                onAddClick,
                onNodeClick
            });
        }}
    </ReaflowNode>
);
