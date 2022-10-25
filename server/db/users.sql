DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL primary key, 
    firstname VARCHAR(255) NOT NULL CHECK(firstname != ''), 
    lastname VARCHAR(255) NOT NULL CHECK(lastname != ''), 
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    url VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

