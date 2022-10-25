


const getBillingByCm = (state, action) => {
    return {
        ...state,
        data: action.payload
    };
}

const loadingBillingByCm = (state) => {
    return {
        ...state,
        loading: true
    };
};

const errorBillingByCm = (state, action) => {
    return {
        ...state,
        error: action.payload
    };
};

export { getBillingByCm, loadingBillingByCm, errorBillingByCm };