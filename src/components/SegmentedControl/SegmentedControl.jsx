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
        <div className={` flex flex-row gap-3 justify-between   z-10 p-1 overflow-hidden m-auto`} ref={controlRef}>
            {segments?.map((item, idx) => (
                <div key={item.value} className={`w-32 relative text-center `} ref={item.ref}                    >
                    <button
                        value={item.value}
                        id={item.label}
                        name={name}
                        onClick={() => onInputChange(idx)}
                        className={`w-full h-full text-center ${activeIndex === idx ? 'bg-black text-white uppercase' : 'bg-gradient-to-r from-gray-400 to-gray-800'}    border-none focus:outline-none rounded-lg `}
                    >
                        <span className={` label`}>{item.label}</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SegmentedControl;
