const promisePool = require("../config/db/db");

const updateIfNull = async (tableName, idColumn, idValue, newValues) => {
    let query = `UPDATE ${tableName} SET `;
    let updates = [];
    let params = [];

    for (let [key, value] of Object.entries(newValues)) {
        updates.push(`${key} = IF(${key} IS NULL, ?, ${key})`);
        params.push(value);
    }

    query += updates.join(', ') + ` WHERE ${idColumn} = ?`;
    params.push(idValue);

    try {
        const [results] = await promisePool.query(query, params);
        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = {updateIfNull}