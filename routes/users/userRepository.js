const connection = require('../../database/databaseConnection');
const encryption = require('../../module/secure/encryption');

const findById = async (userId) => {
    try {
        const [rows] = await connection.query(`SELECT * FROM Member WHERE user_id = ?`, [userId]);
        return rows[0] ?? [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findByEmailAndPassword = async (email,password) => {
    try {
        const [rows] = await connection.query(`SELECT * FROM Member WHERE email = ? AND password = ?`, [email,encryption.hashPassword(email,password)]);
        return rows[0] ?? [];
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
        const { email, password, nickname, phone_num, name, birthday } = user;
        const [result] = await connection.query(
            'INSERT INTO Member ( email, password, nickname, phone_num, name, birthday, join_date) VALUES (?, ?, ?, ?, ?, ?, now())',
            [ email, encryption.hashPassword(email,password), nickname, phone_num, name, birthday]
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

module.exports = {
    findById,
    findByEmailAndPassword,
    findAll,
    update,
    save
};