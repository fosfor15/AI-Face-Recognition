import pg from 'pg';
import bcrypt from 'bcrypt';


const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOSTNAME,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});


const saltRounds = Number(process.env.SALT_ROUNDS);

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

const checkPassword = (password, hash = '') => {
    return bcrypt.compareSync(password, hash);
};


const dbController = {
    getUsers(req, res) {
        pool.query('SELECT * FROM users ORDER BY id ASC')
            .then(dbRes =>
                res.status(200).send(dbRes.rows)
            )
            .catch(error => {
                res.status(500).send({
                    description: error.message
                });
            });
    },

    getUser(req, res) {
        const { id } = req.params;

        pool.query(`SELECT * FROM users WHERE id = ${id}`)
            .then(dbRes => {
                const user = dbRes.rows[0];

                if (!user) {
                    res.status(404).send({
                        description: 'Unable to get user'
                    });
                } else {
                    res.status(200).send(user);
                }
            })
            .catch(error => {
                res.status(500).send({
                    description: error.message
                });
            });
    },

    incrementEntries(req, res) {
        const { id } = req.body;

        pool.query(`UPDATE users SET entries = entries + 1 WHERE id = ${id} RETURNING entries`)
            .then(dbRes => {
                const entries = dbRes.rows[0]?.entries;

                if (!entries) {
                    res.status(404).send({
                        description: 'Unable to get user'
                    });
                } else {
                    res.status(200).send({ entries });
                }
            })
            .catch(error => {
                res.status(500).send({
                    description: error.message
                });
            });
    },

    registerUser(req, res) {
        const { name, email, password } = req.body;
        const hash = hashPassword(password);

        let client;
        
        pool.connect()
            .then(_client => {
                client = _client;
                return client.query('BEGIN');
            })
            .then(() => {
                return client.query(`INSERT INTO users (name, email) VALUES ('${name}', '${email}') RETURNING email`);
            })
            .then(dbRes => {
                const { email: regEmail } = dbRes.rows[0];
                return client.query(`INSERT INTO logins (hash, email) VALUES ('${hash}', '${regEmail}')`);
            })
            .then(() => {
                return client.query('COMMIT');
            })
            .then(() => {
                return client.query(`SELECT * FROM users WHERE email = '${email}'`);
            })
            .then(dbRes => {
                const regUser = dbRes.rows[0];
                res.status(200).send(regUser);
            })
            .catch(error => {
                client.query('ROLLBACK');
                res.status(404).send({
                    description: `Unable to register new user: ${error.message}`
                });
            })
            .finally(() => {
                client.release();
            });
    },

    signinUser(req, res) {
        const { email, password } = req.body;

        pool.query(`SELECT email, hash FROM logins WHERE email = '${email}'`)
            .then(dbRes => {
                const hash = dbRes.rows[0]?.hash;
                const isPasswordValid = checkPassword(password, hash);

                if (isPasswordValid) {
                    pool.query(`SELECT * FROM users WHERE email = '${email}'`)
                        .then(dbRes => {
                            const user = dbRes.rows[0];
                            res.status(200).send({
                                isAuth: true,
                                user
                            });
                        });
                } else {
                    res.status(200).send({
                        isAuth: false,
                        description: 'Wrong email or password'
                    });
                }
            })
            .catch(error => {
                res.status(500).send({
                    description: error.message
                });
            });
    }
};


export default dbController;
