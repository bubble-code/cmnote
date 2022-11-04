
import { nodeConfig } from "../Config/Config";
import { Badge, Button, Col } from "antd";

export const NodeContent = ({ data }) => {
    const { node } = data;
    const { data: nodeData } = node;
    console.log('nodeData', nodeData)
    const type = nodeData.type || "source";
    const title = nodeData.title || "Node Title";
    const description = nodeData.description || "Node Description";

    console.log('data', data)

    const { color, icon } = nodeConfig(type);

    return (
        <foreignObject x={0} y={0} height={node.height} width={node.width}>
            <div className={'NodeWrapper'} >
                <Col className={'NodeContent'} style={{ color }} >
                    <Badge dot={nodeData?.pos}>
                        <div className={'NodeIcon'}>{icon}</div>
                    </Badge>
                    <div className={'NodeDetails'}>
                        <p>{description[0]}</p>
                        <h1>
                            {nodeData?.fecha}
                        </h1>
                    </div>
                    {/*<NodeStats stats={data.stats} showStats={data.showStats} />*/}
                </Col>
            </div>
        </foreignObject>
    );
};