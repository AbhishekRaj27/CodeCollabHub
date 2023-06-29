const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const auth = async (req, res, next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded._id).select('-password -updatedAt -__v')
            if(!user) {
                throw new Error("Not Authorized")
            }
            req.user = user;
            next();

        } else {
            throw new Error("No Authorization provided")
        }
    }catch (e) {
        res.status(400).send({'error': e.message})
    }

}

module.exports  = auth