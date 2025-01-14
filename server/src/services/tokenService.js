const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');

class TokenController {
    async storeToken(body) {
        try {
            const { email = '', password = '' } = body;

            if(!email || !password){
                throw new Error('Email ou Senha não existe.');
            }

            const user = await User.findOne({ where: { email } });

            if(!user){
                throw new Error('Usuário não existe.');
            }

            if(!(await user.passwordIsValid(password))){
                throw new Error('Senha inválida.');
            }

            const { id } = user;

            const token =  jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            })

            return {
                id,
                token
            };


        } catch(error) {
            return { error: error.message };
        }
    }
}

module.exports = new TokenController();