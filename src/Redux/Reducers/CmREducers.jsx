


const loadCms = async (state, action) => {
    return {
        ...state,
        data: action.payload
    };
};

const updateAll = (state, action) => {
    return {
        ...state,
        data: action.payload
    }
};

export { updateAll, loadCms };
