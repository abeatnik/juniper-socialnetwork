DROP TABLE IF EXISTS verification_codes;

CREATE TABLE verification_codes (
    user_email VARCHAR(255) NOT NULL REFERENCES users(email),
    code VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);