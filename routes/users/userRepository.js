const connection = require('../../database/databaseConnection');

const findById = async (userId) => {
    try {
        const [rows] = await connection.query(`SELECT * FROM Member WHERE user_id = ?`, [userId]);
        return rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findAll = async () => {
    try {
        const [rows] = await connection.query(`SELECT * FROM Member`);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const save = async (user) => {
    try {
        const [result] = await connection.query(
            `
                INSERT INTO Member (user_id, name) VALUES (?, ?)
            `
            , [user.user_id, user.name]);
        return result.insertId;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const update = async(user) => {
    try {
        const [originUser] = await connection.query(`SELECT * FROM Member WHERE user_id = ?`, [userId]);
        Object.keys(user).forEach(key=>{
           originUser[key] = user[key];
        });

        await connection.query(
            `
            UPDATE Member 
                SET
                    user_id=?,
                    user_id=?,
                    user_id=?,
                    user_id=?,
                    user_id=?
            WHERE 1=1 
                AND user_id = ${originUser.user_id}
            `
            ,[
                originUser.user_id,
                originUser.user_id,
                originUser.user_id,
                originUser.user_id,
                originUser.user_id
            ]);
        return rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    findById,
    findAll,
    update,
    save
};