import fs from 'fs';
import bcrypt from 'bcrypt';

const fileDbService = {

    // Full Database

    _db: null,

    get db() {
        return this._db || this.updateLocalDb();
    },

    updateLocalDb() {
        return this._db = this.readDb();
    },

    readDb() {
        return JSON.parse(
            fs.readFileSync(
                './database/db.json',
                'utf8'
            )
        );
    },

    writeDb(updatedDb) {
        fs.writeFileSync(
            './database/db.json',
            JSON.stringify({ ...this._db, ...updatedDb }, null, 4),
            'utf8'
        );

        this.updateLocalDb();
    },


    // Users

    _users: null,

    get users() {
        return this._users || this.updateLocalUsers();
    },

    updateLocalUsers() {
        return this._users = this.db.users.slice();
    },

    getUserById(id) {
        return this.users.find(user => user.id == id);
    },

    getUserByName(name) {
        return this.users.find(user => user.name == name);
    },

    getUserByEmail(email) {
        return this.users.find(user => user.email == email);
    },

    *createUser(name, email, password) {
        const id = ++this.users.length

        yield {
            id,
            name,
            email,
            entries: 0,
            registrationDate: new Date()
        };

        return {
            id,
            hash: this.hashPassword(password),
            email
        };
    },
    
    addUser({ name, email, password }) {
        if (this.getUserByEmail(email)) {
            console.log('User with specified email already exist in Database');
            return;
        }

        const userGenerator = this.createUser(name, email, password);

        const updatedUsers = this.users.slice();
        updatedUsers.push( userGenerator.next().value );

        const updatedLogins = this.logins.slice();
        updatedLogins.push( userGenerator.next().value );

        this.writeDb({
            users: updatedUsers,
            logins: updatedLogins
        });

        this.updateLocalUsers();
        this.updateLocalLogins();
    },

    increaseUserEntries(id) {
        const user = this.getUserById(id);

        if (!user) {
            console.log('We don\'t have user with specified ID');
            return;
        }

        user.entries++;
        this.writeDb({ users: this.users });

        return user.entries;
    },

    
    // Logins
    
    _logins: null,
    _saltRounds: 10,
    
    get logins() {
        return this._logins || this.updateLocalLogins();
    },

    updateLocalLogins() {
        return this._logins = this.db.logins.slice();
    },

    hashPassword(password) {
        const salt = bcrypt.genSaltSync(this._saltRounds);
        return bcrypt.hashSync(password, salt);
    },

    getLoginByEmail(email) {
        return this.logins.find(login => login.email == email);
    },

    checkUserEmailPassword({ email, password }) {
        const login = this.getLoginByEmail(email);
        return bcrypt.compareSync(password, login.hash);
    }

};

export default fileDbService;
