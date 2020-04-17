const { Order, User, City, Movie, Genre, Sequelize } = require('../models');
const { Op } = Sequelize;

const SearchController = {
    OrderByDateRent(req, res){
        let { dateRent } = req.params;
        Order.findOne({ 
            where: { dateRent },  
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

    OrderByMovieTitle(req, res){
        let { dateRent } = req.params;
        Order.findOne({ 
            where: { dateRent },  
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


}


module.exports = SearchController;