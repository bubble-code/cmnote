
import { Tooltip, Button } from "antd";
import { ZoomInOutlined, ZoomOutOutlined, CompressOutlined } from "@ant-design/icons";


export const Controls = ({ onZoomIn, onZoomOut, onZoomReset }) => {
    return (
        <div className="controls">
            <Tooltip title="Zoom in" placement="right">
                <Button size="large" shape="circle" icon={<ZoomInOutlined />} onClick={onZoomIn} />
            </Tooltip>
            <Tooltip title="Zoom out" placement="right">
                <Button size="large" shape="circle" icon={<ZoomOutOutlined />} onClick={onZoomOut} />
            </Tooltip>
            <Tooltip title="Reset zoom" placement="right">
                <Button size="large" shape="circle" icon={<CompressOutlined />} onClick={onZoomReset} />
            </Tooltip>
        </div>
    );
};

export const ActionsControls = ({ canvasRef, action }) => {
    switch (action) {
        case 'zoomIn':
            canvasRef.current.zoomIn();
            break;
        case 'zoomOut':
            canvasRef.current.zoomOut();
            break;
        case 'zoomReset':
            canvasRef.current.fitCanvas();
            break;
        default:
            break;
    };
};