BEGIN TRANSACTION;

INSERT INTO users (name, age, pet, email, entries) VALUES ('Superman', 50, 'kind-monster', 'superman@mail.com', 10);
INSERT INTO logins (hash, email) VALUES ('$2b$10$90q2JdFiC9zf6XMH1F9rO.t1ZcOkUT7CQe8THDe80VqeXBhiA8wJK', 'superman@mail.com');

COMMIT;