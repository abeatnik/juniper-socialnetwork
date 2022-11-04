DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
    id SERIAL primary key,
    sender_id INT NOT NULL REFERENCES users(id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );