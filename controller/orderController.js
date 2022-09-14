const {Characteristic, Customer, Order, OrderItem, Plan, PlanItem, Product, Recommendation } = require('../models')


class OrderController{
    // static async showOrderItem(req, res, next){
    //     try {
    //         data = await OrderItem.findAll({
    //             include:[{
    //                 model: Product, 
    //                 throuh: PlanItem}],
    //             order: [["id"]]
    //         })
    //         res.status(200).json(data)
    //     } catch (error) {
    //         console.log(error);
    //         next(error)
    //     }
    // }

    static async addOrder(req, res, next){
        try {
            let targetedId = req.params.id
            let selectedPlan = await Plan.findByPk(targetedId,{
                include:[{
                    model: Product, 
                    throuh: PlanItem}],
            })
            if (!selectedPlan){
                throw { name: 'Not Found'}
            }
            
            let getOrder = await Order.findAll({
                where: {
                    CustomerId: req.user.id
                }
            })
            console.log(getOrder);
            let data = {}
            if(getOrder.length ==0){
                data = {
                    PlanId: targetedId,
                    CustomerId: req.user.id,
                    quantity:1,
                    priceSum: selectedPlan.price
                }
            } else {
                console.log();
                let lastIndex = getOrder.length - 1
                data = {
                    OrderId: getOrder[lastIndex].id,
                    PlanId: targetedId,
                    CustomerId: req.user.id,
                    quantity:1,
                    priceSum: selectedPlan.price
                }
            }

            let newOrder = await OrderItem.create(data)

            res.status(200).json(newOrder)
        } catch (error) {
            console.log(error ,'0000000000000000');

            next(error)
        }
    }
}

module.exports = OrderController