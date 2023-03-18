import pg from 'pg';
import bcrypt from 'bcrypt';


const pool = new pg.Pool({
    database: 'ai-face-recognition',
    host: 'localhost',
    port: 5432,
    user: 'ai-face-recognition-user',
    password: '12345'
});


const dbService = {
    getUsers(req, res) {
        pool.query('SELECT * FROM users')
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
    }

    /* registerUser(req, res) {
        res.status(200).send({
            user: fileDbService.getUserByEmail(req.body.email)
        });
    },

    signinUser(req, res) {
        if (fileDbService.checkUserEmailPassword(req.body)) {
            res.status(200).send({
                isAuth: true,
                user: fileDbService.getUserByEmail(req.body.email)
            });
        } else {
            res.status(200).send({ isAuth: false });
        }
    } */
};


export default dbService;
