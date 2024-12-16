const jwt = require('jsonwebtoken');
const User = require('../models/Users.js')


const validToken = async(req,res,next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if(!authorization) {
        return res.status(401).json({
            errors: ['Login Required'],
        });
    }

    const [, token] = authorization.split(' ');

    try {
        const datas = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = datas;

        const user = await User.findOne({
            where: {
                id,
                email,
            },
            raw: true,
        });

        if(!user) {
            return res.status(401).json({
                errors: ['User invalid or expired'],
            });
        }

        req.userId = id;
        req.userEmail = email;
        return next();

    } catch(error) {
        return res.status(401).json({
            errors: ['Token expired'],
        })
    }

}

module.exports = validToken ; 