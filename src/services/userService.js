const User = require('../models/Users.js');

class UserService {
    async storeUser(body) {
        try {
            const { username, email, password } = body;

            const newUser = await User.create({
                username,
                email,
                password,
            });

            return newUser;
        } catch(error) {
            return { error: error.message };
        }
    }
}

module.exports = new UserService();