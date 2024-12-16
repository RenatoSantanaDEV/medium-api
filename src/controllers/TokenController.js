const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');

class TokenController {
    async store(req, res) {
        try {
            const { email = '', password = '' } = req.body;
            if(!email || !password){
                return res.status(401).json({
                    errors: ['Invalid Data'],
                });
            }

            const user = await User.findOne({ where: { email } });

            if(!user){
                return res.status(401).json({
                    errors: ['Invalid user'],
                });
            }

            if(!(await user.passwordIsValid(password))){
                return res.status(401).json({
                    errors: ['Invalid Password'],
                });
            }
            const { id } = user;
            const token =  jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            })
            res.json({ "token": token });


        } catch(error) {
            res.status(400).json({
                errors: error.errors.map(err => err.message)
            });
        }
    }
}

module.exports = new TokenController();