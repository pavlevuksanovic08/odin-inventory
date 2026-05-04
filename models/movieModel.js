
const pool = require("../db/pool");

exports.getAllMovies = async () => {
    const { rows } = await pool.query(`
            select m.movieID, title, d.fullName as director, array_agg(g.name) as genre
            from movie m 
            join director d
            on m.directorid = d.directorid
            join movie_genre mg ON mg.movieid = m.movieid
            join genre g on g.genreid = mg.genreid
            group by m.movieID, d.fullname;
        `)
    return rows;
}

exports.getMovieById = async (id) => {
    const { rows } = await pool.query(`
            select m.movieid, title, d.fullname as director, array_agg(g.name) as genre
            from movie m
            join director d
            on m.directorid = d.directorid
            join movie_genre mg
            on m.movieid = mg.movieid
            join genre g
            on mg.genreid = g.genreid
            where m.movieid = $1
            group by m.movieid, d.fullname
        `, [id])
    return rows[0];
}

exports.getMoviesByGenre = async (ids) => {
    const { rows } = await pool.query(`
            select m.movieID, title, d.fullName as director, array_agg(g.name) as genre
            from movie m 
            join director d
            on m.directorid = d.directorid
            join movie_genre mg ON mg.movieid = m.movieid
            join genre g on g.genreid = mg.genreid
            where exists (
                select *
                from movie_genre mg2
                where mg2.movieid = m.movieid
                and mg2.genreid = any($1)
            )
            group by m.movieID, d.fullname;
        `, [ids])
    return rows;
}

exports.createMovie = async (title, directorid) => {
    const { rows } = await pool.query(`
            insert into movie (title, directorid) 
            values ($1, $2)
            returning movieid
        `, [title, directorid])
    return rows[0].movieid;
}

exports.addToMovieGenre = async (mId, gId) => {
    console.log(gId)
    await pool.query(`
            insert into movie_genre (movieid, genreid)
            values ($1, $2)
        `, [mId, gId])
}

exports.deleteMovie = async (mId) => {
    await pool.query(`
            delete from movie_genre
            where movieid = $1;
        `, [mId])
    await pool.query(`
            delete from movie
            where movieid = $1;
        `, [mId])
}

exports.updateMovie = async (mId, updated) => {
    
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await client.query(`
            WITH d AS (
                INSERT INTO director (fullname)
                VALUES ($1)
                ON CONFLICT (fullname)
                DO UPDATE SET fullname = EXCLUDED.fullname
                RETURNING directorid
            )
            UPDATE movie
            SET title = $2,
                directorid = (SELECT directorid FROM d)
            WHERE movieid = $3;
        `, [updated.director, updated.title, mId]);

        await client.query(`
            DELETE FROM movie_genre WHERE movieid = $1;
        `, [mId]);

        await client.query(`
            INSERT INTO movie_genre (movieid, genreid)
            SELECT $1, UNNEST($2::int[])
            ON CONFLICT DO NOTHING;
        `, [mId, updated.genres]);

        await client.query(`
            DELETE FROM director d
            WHERE NOT EXISTS (
                SELECT 1 FROM movie m WHERE m.directorid = d.directorid
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