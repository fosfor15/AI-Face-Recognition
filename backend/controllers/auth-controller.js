import { checkSession, getSessionExpiration, setSessionExpiration } from '../services/session-service.js';

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
    },

    checkAndExtendSession(req, res, next) {
        const { authorization: token } = req.headers;

        getSessionExpiration(token)
            .then(sessionExpiration => {
                if (sessionExpiration < 50) {
                    return setSessionExpiration(token, 60);
                }
            })
            .then(() => {
                next();
            });
    }
};

export default authController;
