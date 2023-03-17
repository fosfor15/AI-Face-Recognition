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

        pool.query('SELECT * FROM users WHERE id = $1', [ id ])
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
    }
};


export default dbService;
