const { Order, User, City, Movie, Genre, Sequelize } = require('../models');
const { Op } = Sequelize;

const SearchController = {
    // ORDER BY DATERENT
    OrderByDateRent(req, res){
        Order.findOne({ 
            where: {
                dateRent: 
                {
                    [Op.like]: '%'+ req.params.dateRent +'%'
                }
            },     
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

    // ORDER BY DATEARRIVAL
    OrderByDateArrival(req, res){
        let { dateArrival } = req.params;
        Order.findOne({ 
            where: { dateArrival },  
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

    // ORDER BY MOVIE TITLE
    OrderByMovieTitle(req, res){
        let { title } = req.params;
        Order.findOne({ 
            include: 
                [ 
                    { model: User },
                    { model: Movie,
                        where: { title }, 
                        attributes: {include: 'title'}
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


}


module.exports = SearchController;