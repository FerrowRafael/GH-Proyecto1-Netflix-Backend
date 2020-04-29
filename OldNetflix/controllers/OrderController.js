const { Order, User, City, Movie, Actors, Genre, Sequelize } = require('../models');
const { Op } = Sequelize;
const moment = require('moment'); //Libreria para crear fechas

const OrderController = {

    // ORDERS ALL (WITH MOVIE AND USER)
    OrdersAll(req, res){
        Order.findAll({
            include:[
                Movie,
                User 
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

    // ORDERS BY ID (WITH MOVIE AND USER)
    OrderById(req, res){
        let { id } = req.params;
        Order.findAll({ 
            include: [ 
                { model: Movie,
                    include: { model: Actors,
                    } },
                { model: User,
                    where: { id },
                    include: { model: City,
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

    // ORDER CREATE
    async OrderCreate(req, res){
        try{
            const order = Order.create({
                dateRent: req.body.dateArrival,
                dateArrival: req.body.dateArrival,
                daysRent: req.body.daysRent,
                status: "pending",
                price: req.body.price,
                UserId: req.body.UserId, 
                MovieId: req.body.MovieId
            })
            res.status(201).send({message: 'Pedido realizado con exito'}, order);  
        }
        catch{
            res.status(500).send({message: 'Se ha producido un error al realizar el pedido'})
        }
    },

    // ORDER UPDATE
    OrderModify(req, res){
        let body = req.body;
        let { id } = req.params;
        Order.update({ 
            daysRent: body.daysRent,
            status: "pending",
            price: body.price,
            UserId: body.UserId, //UserId(tiene que venir por un middleware/autentication)
            MovieId: body.MovieId
        },
            { where: 
                { id } 
            }
        )
        .then(data => {
            res.status(200);
            res.send({message: 'Pedido modificado satisfactoriamente'});   
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        });
    },

    // ORDER DELETE
    OrderDelete(req, res){
        let { id } = req.params;
        Order.destroy({ where: { id } })
        .then(data => {
            res.status(200);
            res.send({message: 'Pedido eliminado satisfactoriamente'});
            res.json(data)
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        });
    },

    // ORDERS BY USER ID (WITH MOVIE AND USER)(Hay otra version mejor en USERS)
    OrdersByUserId(req, res){
        let { id } = req.params;
        Order.findAll({
            include: 
                [ 
                    { model: Movie },
                    { model: User,
                        where: { id }, 
                        attributes: {include: 'id'},
                        include: City
                    }    
                ]       
        })
          .then(data => 
            res.json(data))
          .catch(console.error)
    },

    // ORDERS BY USER (WITH MOVIE)(Hay otra version mejor en USERS)
    OrdersUser(req, res) {
        Order.findAll({
                where: {
                    UserId: req.user.id
                },
                include: { model: Movie,
                    include: { model: Actors,
                    }         
                }  
            })
            .then(orders => res.send(orders))
    },

}

module.exports = OrderController;