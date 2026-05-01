const pool = require("../db/pool");

exports.createDirector = async (fullName) => {
    const { rows } = await pool.query(`
            insert into director (fullname)
            values ($1)
            on conflict (fullName)
            do update set fullName = EXCLUDED.fullName
            returning directorid;        
        `, [fullName])
    return rows[0].directorid;
}