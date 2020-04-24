const { Order, User, City, Movie, Actors, Genre, Sequelize } = require('../models');
const { Op } = Sequelize;
const moment = require('moment'); //Libreria para crear fechas

const OrderController = {

    // ORDERS ALL
    OrdersAll(req, res){
        Order.findAll({
            include:[
                Movie ,
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

    // PEDIDO POR ID
    OrderById(req, res){
        let { id } = req.params;
        Order.findOne({ 
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

    // CREAR UN PEDIDO
    OrderCreate(req, res){
        Order.create({
            dateRent: moment().format(),
            dateArrival: moment().add(2, 'days'),
            daysRent:req.body.daysRent,
            status: "pending",
            price:req.body.price,
            UserId:req.body.UserId, //UserId(tiene que venir por un middleware/autentication)
            MovieId:req.body.MovieId
        })
        .then(order=>{
            res.send(order);
        })
    },

    // MODIFY ORDER
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

    // DELETE ORDER
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

    // ORDERS BY USER ID (Hay otra version mejor en USERS)
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


    
}

module.exports = OrderController;