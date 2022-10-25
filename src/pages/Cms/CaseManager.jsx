import { SliceProvider } from "../../Redux/sliceProvider";
import { SliceCMs } from "../../Redux/Slices/CmSlice";

import FormCms from "../../components/FormCms/FormCms";

export const CaseManager = () => {
    return (
        <SliceProvider slice={SliceCMs}>
            <div>CaseManager</div>
            <FormCms />
        </SliceProvider>
    )
}

export default CaseManager