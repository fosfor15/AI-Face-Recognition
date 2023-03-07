import fs from 'fs';

const dbService = {
    _users: null,

    readDb() {
        return JSON.parse(
            fs.readFileSync('./database/database.json', 'utf8')
        );
    },

    updateDb(updatedUsers) {
        fs.writeFileSync(
            './database/database.json',
            JSON.stringify({ users: updatedUsers }, null, 4),
            'utf8'
        );
        
        this.updateLocalUsers();
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
        this.updateDb(updatedUsers);
    },

    increaseUserEntries(id) {
        const user = this.getUserById(id);

        if (!user) {
            console.log('We don\'t have user with specified ID');
            return;
        }

        user.entries++;
        this.updateDb(this.getUsers());
        
        return user;
    }
};

export default dbService;
