DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL primary key, 
    first VARCHAR(255) NOT NULL CHECK(first != ''), 
    last VARCHAR(255) NOT NULL CHECK(last != ''), 
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    url VARCHAR(255),
    bio TEXT,
    online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

