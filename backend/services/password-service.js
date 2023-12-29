import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALT_ROUNDS);

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password, hash = '') => {
    return bcrypt.compareSync(password, hash);
};
