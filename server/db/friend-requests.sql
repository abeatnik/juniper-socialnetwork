DROP TABLE IF EXISTS friend_requests;

CREATE TABLE friend_requests (
    id SERIAL primary key, 
    sender_id INT NOT NULL REFERENCES users(id),
    recipient_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );