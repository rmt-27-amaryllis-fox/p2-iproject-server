const {Characteristic, Customer, Order, OrderItem, Plan, PlanItem, Product, Recommendation } = require('../models')


class ProductController{
    static async showPlan(req, res, next){
        try {
            const getPagination = (page, size) => {
                const limit = size ? +size : 1;
                const offset = page ? page * limit : 0;
                return { limit, offset };
            }
            let {page} = req.query
            const { limit, offset } = getPagination(page, 3)
            let data;
            if(page){
                data = await Plan.findAll({
                    offset: offset,
                    limit: limit,
                    include:[{
                        model: Product, 
                        throuh: PlanItem}],
                    order: [["id"]]
                })
            } else {
                data = await Plan.findAll({
                    include:[{
                        model: Product, 
                        throuh: PlanItem}],
                    order: [["id"]]
                })
            }
            console.log(data);
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async specifiedPlan(req, res, next){
        try {
            let targetedId = req.params.id
            let data = await Plan.findByPk(targetedId,{
                include:[{
                    model: Product, 
                    throuh: PlanItem}],
            })
            if (!data){
                throw { name: 'Not Found'}
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ProductController