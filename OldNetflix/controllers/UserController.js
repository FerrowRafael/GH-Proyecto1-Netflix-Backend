const { User, City, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isValidPassword } = require('../services/validations');
const {
    hashPassword,
    comparePassword,
    createJWT,
    decodeJWT,

 } = require('../services/authorization');

const UserController = {
    // REGISTER
    async register(req, res) { 
        try {
            req.body.role = "user"; //Ponemos en la db por defecto user para que cualquiera no pueda ponerse Admin
            isValidPassword(req.body.password);
            req.body.password = await hashPassword(req.body.password);
            const user = await User.create(req.body);
            res.status(201).send({
                user: user,
                message: 'Usuario creado satisfactoriamente'
            });
        } 
        
        catch (error) {
            console.log(error)

            // if (error.message === 'invalidPasswordError') {
            //     return res.status(400).json({
            //       message: 'Contraseña incorrecta',
            //       error: error,
            //     });
            //   }
            //   if (error.name === 'SequelizeUniqueConstraintError') {
            //     return res.status(400).json({
            //       message: 'Registro invalido',
            //       error: error.errors[0].message,
            //     });
            //   }
            //   if (error.name === 'SequelizeValidationError') {
            //     return res.status(400).json({
            //       message: 'Registro invalido',
            //       error: error.errors[0].message,
            //     });
            //   }

            res.status(500).send({
                message: 'Ha habido un problema al tratar de registrar el usuario'
            })
        }
    },

    // LOGIN
    async login(req, res) {
        try {
            // Comprobamos que existe ese usuario a partir del email
            const user = await User.findOne({
                where:{
                email: req.body.email
                } 
            });

            if (!user) {
                return res.status(401).send({  message: 'Email o contraseña incorrectas' });
            }

            // Comprobamos que el email de la vista es igual al de la base de datos
            const isMatch = await bcrypt.compare(req.body.password, user.password );
            if (!isMatch) {
                return res.status(401).send({ message: 'Email o contraseña incorrectas' });
            }
            const data = {
                username: user.username,
                email: user.email,
                id: user.id,
            };

            // Creamos un token 
            const token = await createJWT(data);
            await Token.create({ token, UserId:user.id });
            res.send({ message: 'Bienvenid@ ' + user.username, user, token });


        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Ha habido un problema al tratar de conectarse' })
        }
    },

    // LOGOUT
    async logout(req, res){
        try {    
            await Token.destroy({
                where:{ [Op.and]:[
                    {UserId:req.user.id},
                    {token:req.headers.authorization}
                ] }
            });
            res.send({message:'Desconectado con éxito'})
        } catch (error) {
            console.log(error)
            res.status(500).send({message:'hubo un problema al tratar de desconectarte'})
        }
    },

    // GET INFO
    async getInfo(req, res){
        res.send(req.user)
    },

    // GET ALL USERS
    UsersAll(req, res){
        User.findAll({
            include: [{
            model: City,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }],})
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },

    // GET USER BY ID
    UsersById(req, res){
        let { id } = req.params;
        User.findOne({ 
            where: { id },
            include: [{model: City,
                attributes: { exclude: ['createdAt', 'updatedAt']}
            }], 
            
        })
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },

    // GET USER BY NAME
    UsersByName(req, res){
        let { username } = req.params;
        User.findOne({ 
            where: { username },
            include: [{model: City,
                attributes: { exclude: ['createdAt', 'updatedAt']}
            }],     
        })
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.send("No existe ningun usuario con ese nombre")
                res.json(`"error": ${err}`);
            });
    },

    // MODIFIED USER
    UserModified(req, res){
        let body = req.body;
        let { id } = req.params;
        User.update({ 
            username: body.username, 
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password, 
            address: body.address, 
            photo: body.photo, 
            creditCard: body.creditCard, 
            CityId: body.CityId 
        },
            { where: 
                { id } 
            }
        )
        .then(data => {
            res.status(200);

            res.send({message: 'Usuario modificado satisfactoriamente'});
            
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        });
    },

    // DELETE USER
    UserDelete(req, res){
        let { id } = req.params;
        User.destroy({ where: { id } })
        .then(data => {
            res.status(200);
            res.send({message: 'Usuario eliminado satisfactoriamente'});
            res.json(data)
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        });
    }
}

module.exports = UserController;