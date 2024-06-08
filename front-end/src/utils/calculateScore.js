import {scoringData} from "../redux/data/scoringData.js";
import {format} from "./formatString.js";

export const calculateScore = (name, value) => {
    const data = scoringData[name];
    let diem = 0;
    const formattedName = format(name);

    if (Array.isArray(data)) {
        // For numerical ranges
        const scoreObj = data.find(item => {
            if (item.min !== undefined && item.max !== undefined) {
                return value >= item.min && value <= item.max;
            } else if (item.min !== undefined) {
                return value >= item.min;
            } else if (item.max !== undefined) {
                return value <= item.max;
            }
            return false;
        });
        diem = scoreObj ? scoreObj.score : 0;
    } else {
        // For exact matches
        diem = data[value] !== undefined ? data[value] : 0;
    }

    return {
        [name]: {
            [formattedName]: value,
            diem: diem
        }
    };
};
