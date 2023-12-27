import jwt from 'jsonwebtoken';

const createToken = (email) => {
    const jwtPayload = { email };
    const jwtOptions = { expiresIn: 86_400 };
    
    console.log('createToken >> process.env.JWT_SECRET :>> ', process.env.JWT_SECRET);

    return jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions);
};

export default createToken;
