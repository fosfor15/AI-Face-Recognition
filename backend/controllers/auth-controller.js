import { checkSession } from '../services/session-service.js';

const authController = {
    requireAuth(req, res, next) {
        const { authorization: token } = req.headers;

        if (token) {
            checkSession(token)
                .then(userId => {
                    if (userId) {
                        next();
                    } else {
                        res.status(200).send({
                            isAuth: false,
                            description: 'Already signed out'
                        });
                    }
                })
                .catch(error => {
                    res.status(500).send({
                        description: error.message
                    });
                });
        } else {
            res.status(401).send({
                description: 'Unauthorized'
            });
        }
    }
};

export default authController;
