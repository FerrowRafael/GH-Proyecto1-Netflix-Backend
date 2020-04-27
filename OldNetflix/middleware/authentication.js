const { User, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwt = require('jsonwebtoken');
const Signature = require('../services/signature')

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token,Signature);
        const user = await User.findByPk(payload.id);
        const tokenFound = await Token.findOne({
            where:{
                [Op.and]:[
                    {UserId:user.id},
                    {token:token}
                ]
            }
        });
        if(!user || !tokenFound){
            res.status(401)
            .send({message:'No estas autorizado'});
        }
        req.user = user;
        next();
    } 
    catch (error) {
        console.log(error)
        res
        .status(500)
        .send({
            error,
            message:'Ha habido un problema con el token'})
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).send({mensaje: 'No tienes permiso para ver esta seccion'})
        }
        next();
    } catch (error) {
        res.status(500).send(error);
    } 
}

module.exports={
    authentication, isAdmin
}