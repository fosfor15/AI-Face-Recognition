import fs from 'fs';

const dbService = {
    readDb() {
        return JSON.parse(
            fs.readFileSync('./database/database.json', 'utf8')
        );
    },

    getUsers() {
        return this.readDb().users;
    },

    getUser({ email }) {
        return this.getUsers().find(user => {
            return user.email == email;
        });
    },
    
    addUser({ name, email, password }) {
        if (this.getUser(email)) {
            console.log('User with specified email already exist in Database');
            return;
        }

        const usersDb = this.getUsers();
        usersDb.push({ name, email, password });
        
        const updatedDb = { users: usersDb };
        const updatedDbJson = JSON.stringify(updatedDb, null, 4);

        fs.writeFileSync('./database/database.json', updatedDbJson, 'utf8');
    }
};

export default dbService;
