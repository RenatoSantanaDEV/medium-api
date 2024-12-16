const User = require('../models/Users.js');

class UserController {
    async store(req, res) {
        console.log("🚀 ~ UserController ~ store ~ req:", req)
        try {
            const newUser = await User.create(req);
            const { username, email } = newUser;
            return res.json({ username, email });
        } catch(error) {
            res.status(400).json({
                errors: error.errors.map(err => err.message)
            });
        }
    }

    async index(req, res) {
        try {
            console.log('aqui')
            const users = await User.findAll({attributes: ['id', 'username', 'email'] });
            const { id } = users;
            res.json(id);
        } catch(error) {
            return res.json(null);
        }
    }

    async show(req, res) {
        try {
            const newUser = await User.findByPk(req.params);

            const { id, username, email } = newUser;

            return res.json({ id, username, email });

        } catch (error) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const user = await User.findByPk(req.params);

            if(!id) {
                return res.status(400).json({
                    errors: ['Missing ID'],
                });
            }

            const newData = await user.update(req.body);
            const { id, username, email } = newData;

            return res.json({id, username, email});

        } catch (error) {
            return res.json(null);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if(!id) {
                return res.status(400).json({
                    errors: ['Missing ID'],
                });
            }
            await user.destroy();
            return res.json(null);

        } catch (error) {
            return res.json(null);
        }
    }
}

module.exports = new UserController();