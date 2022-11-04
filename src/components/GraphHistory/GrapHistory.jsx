
import { useCallback, useRef, useEffect } from "react";
import { Canvas } from "reaflow";
import { useNodesState, useEdgesState } from "react-flow-renderer";
import { Row, Col } from "antd";

import DataService from '../../services/service';
import { createNodesList, createEdgesList } from './Model/actions.jsx';
import { Controls, ActionsControls } from './Controls/Controls.jsx';
import { LayoutOptions } from './Config/Config.jsx';
import { Node } from './Node/Node.jsx';
import './styles.css';

export const GrapHistory = ({ clientName, cm }) => {
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const canvasRef = useRef(null);

    const action = (action) => {
        if (canvasRef.current) {
            ActionsControls({ canvasRef, action });
        }
    }

    const fetchData = useCallback(async () => {
        const response = await DataService.getHistoryClient({ cm: cm, name: clientName })
        const listNodes = createNodesList(response, clientName)
        const listEdges = createEdgesList(listNodes)
        setNodes(listNodes)
        setEdges(listEdges)
        // setListHistory([...nod])

    }, [clientName])

    useEffect(() => {
        fetchData();

    }, [fetchData]);
    return (
        <Row>GrapHistory
            <Col span={24} style={{ height: '70vh', position: 'relative' }}>
                <Controls
                    onZoomIn={() => action('zoomIn')}
                    onZoomOut={() => action('zoomOut')}
                    onZoomReset={() => action('zoomReset')}
                />
                <Canvas
                    fit
                    pannable
                    zoomable
                    animated
                    maxZoom={0.2}
                    minZoom={-0.8}
                    nodes={nodes}
                    edges={edges}
                    ref={canvasRef}
                    layoutOptions={LayoutOptions}
                    node={(node) => <Node node={node} />}
                    height={'100%'}
                    width={'100%'}
                />
            </Col>
        </Row>
    )
}


export default GrapHistory