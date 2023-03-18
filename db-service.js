import pg from 'pg';
import bcrypt from 'bcrypt';


const pool = new pg.Pool({
    database: 'ai-face-recognition',
    host: 'localhost',
    port: 5432,
    user: 'ai-face-recognition-user',
    password: '12345'
});


const saltRounds = 10;

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};


const dbService = {
    getUsers(req, res) {
        pool.query('SELECT * FROM users ORDER BY id ASC')
            .then(dbRes =>
                res.status(200).send(dbRes.rows)
            )
            .catch(err => console.log(err));
    },

    getUser(req, res) {
        const { id } = req.params;

        pool.query(`SELECT * FROM users WHERE id = ${id}`)
            .then(dbRes => {
                const user = dbRes.rows[0];

                if (!user) {
                    res.status(404).send({
                        description: 'We don\'t have user with specified ID'
                    });
                } else {
                    res.status(200).send(user);
                }
            })
            .catch(err => console.log(err));
    },

    incrementEntries(req, res) {
        const { id } = req.body;

        pool.query(`UPDATE users SET entries = entries + 1 WHERE id = ${id} RETURNING entries`)
            .then(dbRes => {
                const entries = dbRes.rows[0]?.entries;

                if (!entries) {
                    res.status(404).send({
                        description: 'We don\'t have user with specified ID'
                    });
                } else {
                    res.status(200).send({ entries });
                }
            })
            .catch(err => console.log(err));
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
            .catch(err => {
                client.query('ROLLBACK');
                console.log(err);
                res.status(404).send({
                    description: 'Unable to register new user'
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
                const { hash } = dbRes.rows[0];
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
            .catch(err => {
                console.log(err);
            });
    }
};


export default dbService;
