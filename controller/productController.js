const {Characteristic, Customer, Order, OrderItem, Plan, PlanItem, Product, Recommendation } = require('../models')


class ProductController{
    static async showPlan(req, res, next){
        try {
            console.log('kena');
            res.status(200).json()
        } catch (error) {
            next()
        }
    }
}

module.exports = ProductController