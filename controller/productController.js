const {Characteristic, Customer, Order, OrderItem, Plan, PlanItem, Product, Recommendation } = require('../models')


class ProductController{
    static async showPlan(req, res, next){
        try {
            const getPagination = (page, size) => {
                const limit = size ? +size : 3;
                const offset = page ? page * limit : 0;
                return { limit, offset };
            }
            let {page} = req.query
            const { limit, offset } = getPagination(page, 9)

            let data = await Plan.findAll({
                offset: offset,
                include:[{
                    model: Product, 
                    throuh: PlanItem}],
                order: [["id"]]
            })
            console.log(data);
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ProductController