const pool = require("../db/pool");

exports.getAllGenres = async () => {
    const { rows } = await pool.query(`
            SELECT * 
            FROM genre;
        `)
    return rows;
}

exports.insertGenre = async (name) => {
    await pool.query(`
            insert into genre (name)
            values ($1);
        `, [name])
}

exports.validateGenreDuplication = async (value) => {
    const { rows } = await pool.query(`
                select 1 
                from genre
                where lower(name) = lower($1)
            `, [value])
    return rows;
}

exports.getGenreById = async (id) => {
    const { rows } = await pool.query(`
            select *
            from genre
            where genreid = $1;
        `, [id])
    return rows[0];
}

exports.editGenre = async (id, newName) => {
    await pool.query(`
            update genre
            set name = $1
            where genreid = $2;
        `, [newName, id]);
}