
-- Deploy fresh database tables
\i 'docker-entrypoint-initdb.d/tables/users.sql'
\i 'docker-entrypoint-initdb.d/tables/logins.sql'

-- Mock data for database
\i 'docker-entrypoint-initdb.d/mock/mock.sql'
