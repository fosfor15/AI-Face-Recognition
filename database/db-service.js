import fs from 'fs';

const dbService = {
    _users: null,

    readDb() {
        return JSON.parse(
            fs.readFileSync('./database/database.json', 'utf8')
        );
    },

    updateLocalUsers() {
        return this._users = this.readDb().users.slice();
    },

    getUsers() {
        return this._users || this.updateLocalUsers();
    },

    getUserById(id) {
        return this.getUsers().find(user => user.id == id);
    },

    getUserByName(name) {
        return this.getUsers().find(user => user.name == name);
    },

    getUserByEmail(email) {
        return this.getUsers().find(user => user.email == email);
    },

    createUser(name, email, password) {
        return {
            id: ++this.getUsers().length,
            name,
            email,
            password,
            entries: 0,
            registrationDate: new Date()
        };
    },
    
    addUser({ name, email, password }) {
        if (this.getUserByEmail(email)) {
            console.log('User with specified email already exist in Database');
            return;
        }

        const updatedUsers = this.getUsers().slice();
        updatedUsers.push(this.createUser(name, email, password));
        const updatedDb = JSON.stringify({ users: updatedUsers }, null, 4);

        fs.writeFileSync('./database/database.json', updatedDb, 'utf8');
        this.updateLocalUsers();
    }
};

export default dbService;
