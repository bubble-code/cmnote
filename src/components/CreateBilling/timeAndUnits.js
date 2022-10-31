import moment from "moment";


export function duration({ tStart, tEnd }) {
    return moment.duration(moment(tEnd, 'HH:mm') - moment(tStart, 'HH:mm')).asMinutes() || 0
}

export function countUnits(duration = 0) {
    switch (true) {
        case duration < 8:
            return 0;
        case duration >= 8 && duration <= 22:
            return 1;
        case duration >= 23 && duration <= 37:
            return 2;
        case duration >= 38 && duration <= 52:
            return 3;
        case duration >= 53 && duration <= 67:
            return 4;
        case duration >= 68 && duration <= 82:
            return 5;
        case duration >= 83 && duration <= 97:
            return 6;
        case duration >= 98 && duration <= 112:
            return 7;
        case duration >= 113 && duration <= 127:
            return 8;
        case duration >= 128 && duration <= 142:
            return 9;
        default:
            return 10;
    }
};