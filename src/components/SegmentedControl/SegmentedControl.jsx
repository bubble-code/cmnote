import { useRef, useState, useEffect } from "react";

import { Col, Typography } from "antd";
import "./style.css";


const SegmentedControl = ({ name, segments, callback, defaultIndex = 0, controlRef }) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const componentReady = useRef();

    // Determine when the component is "ready"
    useEffect(() => {
        componentReady.current = true;
    }, []);

    useEffect(() => {
        const activeSegmentRef = segments[activeIndex].ref;
        const { offsetWidth, offsetLeft } = activeSegmentRef.current;
        const { style } = controlRef.current;

        style.setProperty("--highlight-width", `${offsetWidth}px`);
        style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
    }, [activeIndex, callback, controlRef, segments]);

    const onInputChange = (idx) => {
        setActiveIndex(idx);
        callback({ idx });
    };

    return (
        <Col className="controls-container" ref={controlRef}>
            <div className={`controls ${componentReady.current ? "ready" : "idle"}`}>
                {segments?.map((item, idx) => (
                    <div
                        key={item.value}
                        className={`segment ${idx === activeIndex ? "active" : "inactive"}`}
                        ref={item.ref}
                    >
                        <input
                            type="radio"
                            value={item.value}
                            id={item.label}
                            name={name}
                            onChange={() => onInputChange(idx)}
                            checked={idx === activeIndex}
                        />
                        <Typography.Text className="label">{item.label}</Typography.Text>
                    </div>
                ))}
            </div>
        </Col>
    );
};

export default SegmentedControl;
