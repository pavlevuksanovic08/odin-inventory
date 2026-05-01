require("dotenv").config()
const { Client } = require("pg")

const SQL = `
    create table director (
        directorID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        fullName varchar(60) UNIQUE
    );

    create table movie (
        movieID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title varchar(50) NOT NULL,
        directorID INTEGER,
        FOREIGN KEY (directorID) REFERENCES director(directorID)
    );

    create table genre (
        genreID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(30) NOT NULL UNIQUE
    );

    create table movie_genre(
        movieID INTEGER,
        genreID INTEGER,
        PRIMARY KEY (movieID, genreID),
        FOREIGN KEY (movieID) REFERENCES movie(movieID),
        FOREIGN KEY (genreID) REFERENCES genre(genreID)
    );

insert into director (fullName) values 
('Christopher Nolan'),
('Quentin Tarantino'),
('Martin Scorsese');

insert into movie (title, directorID) values
('Inception', 1),
('Pulp Fiction', 2),
('The Wolf of Wall Street', 3),
('Django Unchained', 2);

insert into genre (name) values
('Action'),
('Drama'),
('Crime'),
('Sci-Fi');

insert into movie_genre (movieID, genreID) values
-- Inception
(1, 1),
(1, 4),

-- Pulp Fiction
(2, 2),
(2, 3),

-- Wolf of Wall Street
(3, 2),
(3, 3),

-- Django
(4, 1),
(4, 2);
`

async function main() {
    console.log("seeding...")
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done.")
}

main()