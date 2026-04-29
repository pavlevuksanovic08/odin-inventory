
const pool = require("../db/pool");

exports.getAllGenres = async () => {
    const { rows } = await pool.query(`
            SELECT * 
            FROM genre;
        `)
    return rows;
}