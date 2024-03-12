const { Pengguna } = require('../models');
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');

const register = async (req,res, next) => {
    try {
        const {name, email, phone, password, role,} = req.body;

        const existingUser = await Pengguna.findOne({
            where: {email}
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email telah terdaftar"
            });
        }

        const saltRounds = 10
        const hashedPassword = bcrypt.hashSync(password, saltRounds)

        const newUser = await Pengguna.create({
            name,
            email, 
            phone,
            password: hashedPassword,
            role,
        });
        return res.status(200).json({
            message: 'User registered successfully',
            user: newUser
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
          });
      }
}

module.exports = {
    register,

}