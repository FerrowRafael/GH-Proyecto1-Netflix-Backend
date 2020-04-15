const { Order, User, City,Movie, Genre, Sequelize } = require('../models');
const { Op } = Sequelize;

const OrderController = {
    ordersAll(req, res){
        Order.findAll()
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },

    orderById(req, res){
        let { id } = req.params;
        Order.findOne({ 
            where: { id },  
            include:[
                Movie ,
                User 
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

    orderByEmail(req, res){

    },

    // CREAR UN PEDIDO
    orderCreate(req, res){
        Order.create({
            dateRent: req.body.dateRent,
            dateArrival: req.body.dateArrival,
            daysRent:req.body.daysRent,
            status: "pending",
            price:req.body.price,
            UserId:req.body.UserId, //UserId(tiene que venir por un middleware/autentication)
            MovieId:req.body.MovieId
        })
        .then(order=>{
            res.send(order);
        })


        // .then(item => {
        //     dateArrival.setDate(dateArrival.getDate() + ((item) ? item.deliverDays : 1));
        //     return dateArrival;
        //   })
        //   .catch(err => {
        //     return res.status(500).json({ message: `Date Arrival error: ${err}` });
        //   });
    },

    // BUSCAR TODOS LOS PEDIDOS DE UN USUARIO POR ID
    ordersAllUser(req, res){
        let { id } = req.params;
        User.findOne({ 
            where: { id },  
            include: [{model: Order,
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

    orderModify(req, res){

    },

    ordersAll(req, res){

    },
}

module.exports = OrderController;