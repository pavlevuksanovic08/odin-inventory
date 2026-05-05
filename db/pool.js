const { Pool } = require('pg');

// Determine which URL to use based on NODE_ENV
const connectionString = process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_URL 
    : process.env.DEVELOPMENT_URL;

const pool = new Pool({
    connectionString: connectionString,
    // Render requires SSL for production, but local usually doesn't
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;