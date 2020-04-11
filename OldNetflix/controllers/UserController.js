const { User, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
    // REGISTER
    async register(req, res) {
        
        try {
            
            req.body.role = "user"; //Ponemos en la db por defecto user para que cualquiera no pueda ponerse Admin
            const hash = await bcrypt.hash(req.body.password, 9);
            req.body.password = hash;
            const user = await User.create(req.body);
            res.status(201).send({
                user,
                message: 'Usuario creado satisfactoriamente'
            });
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Ha habido un problema al tratar de registrar el usuario'
            })
        }

    },

    // LOGIN
    async login(req, res) {
        try {
            // Comprobamos que existe ese usuario a partir del email
            const user = await User.findOne({where:{
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

            // Creamos un token con el codigo 'secretitos'
            const token = jwt.sign({id:user.id},'secretitos');
            await Token.create({ token, UserId:user.id });
            res.send({ message: 'Bienvenid@ ' + user.firstname, user,token });

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
    getInfo(req, res){
        res.send(req.user)
    },

    // GET ALL USERS
    UsersAll(req, res){
        User.findAll()
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
        User.findAll({ where: { id } })
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    },

    // GET USER BY NAME
    UsersByName(req, res){
        let { firstname } = req.params;
        User.findAll({ where: { firstname } })
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    },

    // MODIFIED USER
    UserModified(req, res){
        let { id } = req.params;
        let { username, password, email, role } = req.body;
        User.update(
            { username, password, email, role },
            { where: { id } }
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
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        });
    }

}

module.exports = UserController;