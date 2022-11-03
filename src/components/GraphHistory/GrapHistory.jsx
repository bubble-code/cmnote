
// import { useState } from "react"

// import { Canvas, Node } from "reaflow";
// import ReactFlow from "react-flow-renderer";
import { Row, Col } from "antd"
import { useEffect, useState } from "react"
import OverviewFlow from './Graph.jsx'

import DataService from '../../services/service'

// import { nod, edges } from "./source"
// import { Node } from "./Node"

import './styles.css'

export const GrapHistory = ({ clientName, cm }) => {
    const [listHistory, setListHistory] = useState([])

    useEffect(() => {
        DataService.getHistoryClient({ cm: cm, name: clientName }).then((response) => {
            console.log(response);
            setListHistory(response)
        })
    }, [clientName, cm]);
    return (
        <Row>GrapHistory
            <Col span={24} style={{ height: '80vh' }}>
                {<OverviewFlow list={listHistory} cn={clientName} />}
            </Col>
        </Row>
    )
}

export default GrapHistory