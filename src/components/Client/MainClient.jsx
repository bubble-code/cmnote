
import { useState, useRef } from "react"
import { SelectInputCm } from "../SelectInputCm/selectInputCm"
import { RenderClient } from "./renderClient"
import { GridContainer } from "../gridContainer/gridContainer"
import SegmentedControl from "../SegmentedControl/SegmentedControl"
import { useEffect } from "react"

export const MainClient = () => {
    const [cm, setCm] = useState(null)
    const [selectedValue1, setSelectedValue1] = useState({ idx: 0 })
    const segmentedControlRef = useRef()

    function onChangeCmList(value) {
        setCm(value)
    }
    function onChangeCmStatic(value) {
        // setCm(value)
    }

    return (
        <section className="min-h-screen">
            <div className="mt-14">
                <div className="w-1/2">
                    <SegmentedControl
                        name={"client"}
                        callback={setSelectedValue1}
                        controlRef={segmentedControlRef}
                        segments={[
                            {
                                label: "List Client",
                                value: "listClient",
                                ref: segmentedControlRef
                            },
                            {
                                label: "Stadistic",
                                value: "stadistic",
                                ref: segmentedControlRef
                            },
                            {
                                label: "Create Client",
                                value: "createClient",
                                ref: segmentedControlRef
                            },
                            {
                                label: "Edit Client",
                                value: "editClient",
                                ref: useRef()
                            }
                        ]}

                    />
                </div>
                {selectedValue1.idx === 0 &&
                    <div>
                        <SelectInputCm onChangeCm={onChangeCmList} />
                        <RenderClient cm={cm} />
                    </div>}

                {selectedValue1.idx === 1 && <div>
                    <SelectInputCm onChangeCm={onChangeCmStatic} />
                </div>}
            </div>
        </section>
    )
}
