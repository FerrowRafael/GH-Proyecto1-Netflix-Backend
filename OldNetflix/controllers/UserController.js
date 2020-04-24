const { User, City, Order, Movie, Token, Sequelize } = require('../models');
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

    // LOGOUT
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

    // GET INFO
    async getUserInfo(req, res){
        res.send(req.user)
    },

    // GET ALL USERS
    UsersAll(req, res){
        User.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                City, 
                Order
            ],
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

    // GET USER BY ID
    UserById(req, res){
        let { id } = req.params;
        User.findOne({ 
            where: { id }, 
            include: [ 
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

    // GET USER BY NAME
    UserByName(req, res){
        let { username } = req.params;
        User.findOne({ 
            where: { username },
            include: [ 
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
                res.send("No existe ningun usuario con ese nombre")
                res.json(`"error": ${err}`);
            });
    },

    async UserModified(req, res) {
        try {
            req.body.role = "user";
            if (req.body.password) {
                //comparamos que la vieja contraseña corresponde a la de MongoD
                const isMatch = await bcrypt.compare(req.body.oldPassword, req.user.password);
                if (!isMatch) return res.status(401).send({ //en caso de no corresponder no actualizamos la contraseña
                    message: 'Wrong credentials'
                })
                req.body.password = await bcrypt.hash(req.body.password, 9);
            }
            //findByIdAndUpdate toman el _id como primer argument y actualiza ese documento con los campos que le pasemos en el segundo argumento
            const user = await UserModel.findByIdAndUpdate("5ea021ae04400436081393bf", req.body, {
                new: true
            })
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    // MODIFIED USER
    // UserModified(req, res){
    //     let body = req.body;
    //     let { id } = req.params;
    //     User.update({ 
    //         username: body.username, 
    //         firstName: body.firstName,
    //         lastName: body.lastName,
    //         email: body.email,
    //         password: body.password, 
    //         address: body.address, 
    //         imageURL: body.imageURL, 
    //         CityId: body.CityId 
    //     },
    //         { where: 
    //             { id } 
    //         }
    //     )
    //     .then(data => {
    //         res.status(200);
    //         res.send({message: 'Usuario modificado satisfactoriamente'});   
    //     })
    //     .catch(err => {
    //         res.status(500);
    //         res.json(`"error": ${err}`);
    //     });
    // },

    // DELETE USER
    UserDelete(req, res){
        let { id } = req.params;
        User.destroy
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