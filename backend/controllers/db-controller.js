import pg from 'pg';

import { hashPassword, checkPassword } from '../services/password-service.js';
import { createToken, createSession, removeSession, checkSession } from '../services/session-service.js';


const pool = new pg.Pool({
    // connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOSTNAME,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});


const dbController = {
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
        const { authorization: token } = req.headers;

        if (token) {
            checkSession(token)
                .then(userId => {
                    if (userId) {
                        res.status(200).send({
                            isAuth: true,
                            userId,
                            token
                        });
                    } else {
                        res.status(200).send({
                            isAuth: false,
                            description: 'Not authorized'
                        });
                    }
                })
                .catch(error => {
                    res.status(500).send({
                        description: error.message
                    });
                });

        } else {
            const { email, password } = req.body;

            pool.query(`SELECT hash FROM logins WHERE email = '${email}'`)
                .then(dbRes => {
                    const hash = dbRes.rows[0]?.hash;
                    const isPasswordValid = checkPassword(password, hash);

                    if (isPasswordValid) {
                        pool.query(`SELECT id FROM users WHERE email = '${email}'`)
                            .then(dbRes => {
                                const userId = dbRes.rows[0]?.id;

                                const token = createToken(email);
                                createSession(userId, token);

                                res.status(200).send({
                                    isAuth: true,
                                    userId,
                                    token
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
    },

    signoutUser(req, res) {
        const { authorization: token } = req.headers;

        removeSession(token)
            .then(() => {
                res.status(200).send({
                    isAuth: false,
                    description: 'Signed out successfully'
                });
            })
            .catch(error => {
                res.status(500).send({
                    description: error.message
                });
            });
    },


    // #region Commented test method
    /* getUsers(req, res) {
        pool.query('SELECT * FROM users ORDER BY id ASC')
            .then(dbRes =>
                res.status(200).send(dbRes.rows)
            )
            .catch(error => {
                res.status(500).send({
                    description: error.message
                });
            });
    }, */
    // #endregion

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

    updateUser(req, res) {
        const { id } = req.params;
        const { name, age, pet } = req.body;

        let update = [];

        if (name) {
            update.push(`name = '${name}'`);
        }

        if (age) {
            update.push(`age = '${age}'`);
        }

        if (pet) {
            update.push(`pet = '${pet}'`);
        }

        pool.query(`UPDATE users SET ${ update.join(', ') } WHERE id = ${id} RETURNING *`)
            .then(dbRes => {
                const user = dbRes.rows[0];
                res.status(200).send({
                    description: 'Profile was updated successfully',
                    user
                });
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

                if (entries) {
                    res.status(200).send({ entries });
                } else {
                    res.status(404).send({
                        description: 'Unable to get user'
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
