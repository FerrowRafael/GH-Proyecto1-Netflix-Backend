const { User, City, Order, Movie, Actors, Token, Sequelize } = require('../models');
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
    // 1 REGISTER
    async register(req, res) { 
        try {
            // req.body.role = "user"; //Ponemos en la db por defecto user para que cualquiera no pueda ponerse Admin
            isValidPassword(req.body.password);
            req.body.password = await hashPassword(req.body.password);
            const user = await User.create(req.body);
            res
            .status(201)
            .send({
                user: user,
                message: 'Usuario creado satisfactoriamente'
            });
        } 
        
        catch (error) {
            console.log(error)
            res
            .status(500)
            .send({
                message: 'There was a problem trying to sign up'
            })

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

    // 2 LOGIN
    async login(req, res) {
        try {
            // Comprobamos que existe ese usuario a partir del email
            const user = await User.findOne({
                where:{
                email: req.body.email
                } 
            });

            if (!user) {
                return res
                .status(401)
                .send({ message: 'Email o contraseña incorrectas' });
            }

            // Comprobamos que el email de la vista es igual al de la base de datos
            const isMatch = await bcrypt.compare(req.body.password, user.password );
            if (!isMatch) {
                return res
                .status(401)
                .send({ message: 'Email o contraseña incorrectas' });
            }
            const data = {
                username: user.username,
                email: user.email,
                id: user.id,
            };

            // Creamos un token 
            const token = await createJWT(data);
            await Token.create({ token, UserId:user.id });
            res
            .send({ message: 'Bienvenid@ ' + user.username, user, token });
        } 
        
        catch (error) {
            console.log(error)
            res
            .status(500)
            .send({ message: 'Ha habido un problema al tratar de conectarse' })
        }
    },

    // 3 LOGOUT
    async logout(req, res){
        try {    
            await Token.destroy({
                where:{[Op.and]:[
                    {UserId:req.user.id},
                    {token:req.headers.authorization}
                ]}
            },
            {
                new: true
            });
            res
            .send({message:'Desconectado con éxito'})
        } 
        
        catch (error) {
            console.log(error)
            res
            .status(500)
            .send({message:'hubo un problema al tratar de desconectarte'})
        }
    },

    // 4 GET INFO
    async UserInfo(req, res){
        try {
            const user = await User.findOne({
                where: { username: req.user.dataValues.username },
                include: [ 
                    { model: City },
                    { model: Order,
                        include: { model: Movie,
                            include: Actors
                        } 
                            
                    }    
                ],
            })
            res
            .send(user)
        } catch (error) {
            res
            .status(500)
            .send({ message: 'Hubo un problema al tratar de obtener los datos del usuario' });
        }
    },

    // 5 USER MODIFY
    async UserModified(req, res) {
        try {
            let body = req.body
            body.role = body.role;
            if (body.password) {
                
                //comparamos que la vieja contraseña corresponde a la de MongoD
                const isMatch = await bcrypt.compare(body.oldPassword, req.user.password);
                // res.send(isMatch)
                if (!isMatch) return res.status(401).send({ //en caso de no corresponder no actualizamos la contraseña
                    message: 'Wrong credentials'
                })
                body.password = await bcrypt.hash(body.password, 9);
            }
            let user = await User.update({...req.body, password: req.body.password }, { where: { id: req.user.id } })
            res.send({message: 'Usuario modificado satisfactoriamente', user})
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    // 6 USER DELETE 
    async UserDelete(req, res){
        let { id } = req.params;
        await User.destroy
        ({ 
            where: 
            { id } 
        })
        .then(data => {
            res.status(200);
            res.send({message: 'Usuario eliminado satisfactoriamente'});
            res.json(data)
        })
        .catch(err => {
            res.status(500);
            res.json(err);
        });
    },

    // 7 ALL USERS
    UsersAll(req, res){
        User.findAll({
            // attributes: { exclude: ['createdAt', 'updatedAt'] },
            // include: [ 
            //     { model: City },
            //     { model: Order,
            //         include: { model: Movie,
            //             include: Actors
            //         }       
            //     }    
            // ],
        })
            .then(users => {
                res.status(200);
                res.send(users);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },

    // 8 GET USER BY ID
    UserById(req, res){
        let { id } = req.params;
        User.findOne({ 
            where: { id }, 
            include: [ 
                { model: City },
                { model: Order,
                    include: { model: Movie,
                        include: Actors
                    }        
                }    
            ],
            attributes: { exclude: ['createdAt', 'updatedAt']}      
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

    // 9 GET USER BY NAME
    UserByName(req, res){
        let { username } = req.params;
        User.findOne({ 
            where: { username },
            include: [ 
                { model: City },
                { model: Order,
                    include: { model: Movie,
                        include: Actors
                    }         
                }    
            ],
            attributes: { exclude: ['createdAt', 'updatedAt']}         
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

    // ALL ONE USER ORDERS BY ID
    UsersOrdersAll(req, res){
        User.findAll({ 
            include: [{
                model: Order,
                include: [{
                    model: Movie
                }],
                attributes: { exclude: ['createdAt', 'updatedAt']} 
            }],
            attributes: { exclude: ['createdAt', 'updatedAt']}
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

    // PEDIDOS DE UN USUARIO POR ID
    UsersOrdersByUserId(req, res){
        let { id } = req.params;
        User.findAll({ 
            where: { id },  
            include: 
                [ 
                    { model: City },
                    { model: Order,
                        include: Movie
                    }    
                ], 
                attributes: { exclude: ['createdAt', 'updatedAt']} 
            
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

    //4 ORDER BY ORDER DATE ¿?
    UserByOrderDates(req,res){
        let { id } = req.params;
        User.findOne({
            where: { id }, 
            attributes:['id','username'],
            include: [{model: Order,
                attributes: ['id', 'dateRent', 'dateArrival', 'daysRent']
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

    // BUSQUEDA PEDIDO POR EMAIL
    OrderByEmail(req, res){
        let { email } = req.params;
        User.findOne({ 
            where: { email },  
            include:[{
                model: Order,
                include:[
                    Movie]
            }],
                attributes: { exclude: ['createdAt', 'updatedAt']}
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

}

module.exports = UserController;