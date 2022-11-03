import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const SliceContext = createContext({});
const SliceBillingByCmContext = createContext({});
// ===================
SliceContext.displayName = 'SliceContext';

const SliceProvider = ({ slice, children }) => {
    return (
        <SliceContext.Provider value={slice}>
            {children}
        </SliceContext.Provider>
    );
};

const useSliceActions = () => {
    const slice = useContext(SliceContext);
    return slice.actions;
};

const useSliceSelector = () => {
    return useSelector((state) => state.CManager);
}

// ===================
SliceBillingByCmContext.displayName = "SliceContextBillingByCm";
const BillingByCmProvider = ({ slice, children }) => {
    return (
        <SliceBillingByCmContext.Provider value={slice}>
            {children}
        </SliceBillingByCmContext.Provider>
    );
};

const useSliceBillingByCmActions = () => {
    const slice = useContext(SliceBillingByCmContext);
    return slice.actions;
};

const useSliceBillingByCmSelector = () => {
    return useSelector((state) => state.BillingByCm);
};


export { SliceProvider, useSliceActions, useSliceSelector, BillingByCmProvider, useSliceBillingByCmActions, useSliceBillingByCmSelector };