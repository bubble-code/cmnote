import React, { useCallback } from 'react';
import {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from 'react-flow-renderer';
import ReactFlow from 'react-flow-renderer';
import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';

import 'react-flow-renderer/dist/style.css';
import './overview.css';



import { useEffect } from 'react';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = ({ list, cn }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    let nod = list.map((element, index) => {
      let deslx = index % 2 === 0 ? 400 : 100;
      return ({
        id: `${index + 2}`,
        type: 'custom',
        data: { label: element.description[0] },
        position: { x: deslx, y: 25 * (index + 5) },
      });
    });
    setNodes([{
      id: '1',
      type: 'input',
      data: { label: cn },
      position: { x: 250, y: 25 },
    }, ...nod]);
  }, [cn, list, setNodes]);
  // createlistNodes.push(...initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  // const edgesWithUpdatedTypes = edges.map((edge) => {
  //   if (edge.sourceHandle) {
  //     const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
  //     edge.type = edgeType;
  //   }

  //   return edge;
  // });

  return (
    <ReactFlow className='nodeflow'
      // nodes={nodes}
      // edges={edges}

      // edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // onInit={onInit}
      fitView
      snapToGrid
      attributionPosition="top-center"
      // nodeTypes={nodeTypes}
      defaultZoom={0.1}
    >
      {(event) => console.log(event)}
      <foreignObject x="0" y="0" width="100%" height="100%">
        <div style={{ position: 'relative' }}>
        xccxzcnzlncznl
        </div>
      </foreignObject>
      {/*<MiniMap style={minimapStyle} zoomable pannable />
      <Controls />*/}

      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
