

const NODE_WIDTH = 220;
const NODE_HEIGHT = 164;

export const createNodesList = (list, cn) => {
    const listNodes = [{
        id: '1',
        data: {
            description: { 0: cn }
        },
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
    }]
    listNodes.push(list.map((element, index) => {
        // let deslx = index % 2 === 0 ? 400 : 100;
        return ({
            id: `${index + 2}`,
            // text: element.description[0],
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            data: {
                ...element
            }
        })
    }))
    return listNodes.flat()
};

export const createEdgesList = (list) => {
    const listEdges = []
    for (let index = 0; index < list.length - 1; index++) {
        if (index === 0) {
            listEdges.push({
                id: `${index + 1}`,
                from: '1',
                to: `${index + 2}`
            })
        } else {
            listEdges.push({
                id: `${index + 1}`,
                from: `${1}`,
                to: `${index + 2}`,
                type: 'smoothstep',
            })

        }

    }
    return listEdges
};