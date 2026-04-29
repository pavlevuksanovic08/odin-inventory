
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