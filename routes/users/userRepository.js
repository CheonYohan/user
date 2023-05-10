const connection = require('../../database/databaseConnection');
const encryption = require('../../modules/secure/encryption');

const findById = async (userId) => {
    try {
        const [rows] = await connection.query(`SELECT * FROM Member WHERE user_id = ?`, [userId]);
        return rows[0] ?? [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findByIdAndPassword = async (id,password) => {
    try {
        const rows = await connection.query(`SELECT * FROM Member WHERE user_id = ? AND password = ?`, [id,encryption.hashPassword(id,password).password]);
        return rows[0] ?? {};
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
        const { user_id, email, password, nickname, phone_num, name, birthday } = user;
        const [result] = await connection.query(
            'INSERT INTO Member ( user_id,email, password, nickname, phone_num, name, birthday, join_date) VALUES (?, ?, ?, ?, ?, ?, ?, now())',
            [ user_id, email, encryption.hashPassword(email,password).password, nickname, phone_num, name, birthday]
        );
        return result.insertId;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const update = async (userId, fieldsToUpdate) => {
    try {
        const columnsToUpdate = [];
        const valuesToUpdate = [];

        for (const key in fieldsToUpdate) {
            columnsToUpdate.push(`${key} = ?`);
            valuesToUpdate.push(fieldsToUpdate[key]);
        }

        const query = `UPDATE Member SET ${columnsToUpdate.join(', ')} WHERE user_id = ?`;
        valuesToUpdate.push(userId);

        await connection.query(query, valuesToUpdate);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const remove = async (userId) => {
    try{
        await connection.query(
            'DELETE FROM Member WHERE user_id = ?',
            [ user_id]
        );
    }catch(err){
        console.error(err);
        throw err;
    }
}

module.exports = {
    findById,
    findByIdAndPassword,
    findAll,
    update,
    save,
    remove
};