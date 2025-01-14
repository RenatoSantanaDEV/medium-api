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
    async showUser(id) {
        try {
            const user = await User.findOne({
                where: {
                    id,
                    deleted_at: null
                },
                attributes: ['id', 'username', 'email'],
            });

            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            return user;

        } catch(error) {
            return { error: error.message };
        }
    }
}

module.exports = new UserService();