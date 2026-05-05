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

exports.deleteGenre = async (id) => {

    const client = await pool.connect()

    try {
        await client.query("BEGIN")

        await client.query(`
            delete from genre
            where genreid = $1
        `, [id])

        await client.query(`
                delete from movie m
                where not exists (
                    select 1
                    from movie_genre mg
                    where mg.movieid = m.movieid
                );
            `);


        await client.query("COMMIT")
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
    
}