DROP TABLE IF EXISTS friend_requests;

CREATE TABLE friend_requests (
    id SERIAL primary key, 
    id_sender INT NOT NULL REFERENCES users(id),
    id_recipient INT NOT NULL REFERENCES users(id),
    accepted BIT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );