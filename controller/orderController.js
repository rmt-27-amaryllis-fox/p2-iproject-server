const {Characteristic, Customer, Order, OrderItem, Plan, PlanItem, Product, Recommendation } = require('../models')
const midtransClient = require('midtrans-client');
const axios = require("axios")

class OrderController{
    static async showOrderItem(req, res, next){
        try {
            let data = await OrderItem.findAll({
                where: {
                    CustomerId: req.user.id,
                    OrderId: null
                },
                attributes:["id","OrderId","CustomerId", "PlanId", "quantity", "priceSum", "createdAt", "updatedAt"],
                include:[Plan],
                order: ["id"]
            })
            console.log(data);
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

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
            data = {
                PlanId: targetedId,
                CustomerId: req.user.id,
                quantity:1,
                priceSum: selectedPlan.price
            }
            let newOrder = await OrderItem.create(data)

            res.status(201).json(newOrder)
        } catch (error) {
            console.log(error);

            next(error)
        }
    }

    static async delOrder(req, res, next) {
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
            let customerId = req.user.id

            let delOrder = await OrderItem.destroy({
                where:{
                    CustomerId: customerId,
                    id: targetedId
                }
            })
            if (!delOrder){
                throw {name: 'Not Found'}
            }
            res.status(200).json(selectedPlan)
        } catch (error) {
            next(error)
        }
    }

    static async upOrder(req, res, next){
        try {
            let targetedId = req.params.id
            let selectedPlan = await Plan.findByPk(targetedId,{
                include:[{
                    model: Product, 
                    throuh: PlanItem}],
            })
            console.log(selectedPlan);
            if (!selectedPlan){
                throw { name: 'Not Found'}
            }
            let {quantity} = req.query

            let newprice = quantity * selectedPlan.price

            let input = {
                quantity:quantity,
                priceSum:newprice
            }
            // console.log(body, targetedId);
            let data = await OrderItem.update( input , {
                where: {
                    id:targetedId
                }
            })
            res.status(200).json({data})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async compileOrder(req, res, next){
        try {
            let CustomerId = req.user.id
            let {totalPrice} = req.query
            let invoice = await Order.create({
                CustomerId, totalPrice
            })
            let allItems = await OrderItem.findAll({
                where: {
                    CustomerId: req.user.id,
                    OrderId: null
                },
                attributes:["id","OrderId","CustomerId", "PlanId", "quantity", "priceSum", "createdAt", "updatedAt"],
                include:[Plan],
                order: ["id"]
            })
            for (let i = 0; i < allItems.length; i++) {
                let input = {
                    OrderId : invoice.id
                }
                console.log(input, 0);
                console.log(allItems, 1);
                console.log(allItems[i], 2);
                console.log(allItems[i].id, 3);
                console.log(invoice.id, 4);
                console.log(invoice, 5);
                let {OrderId} = req.query
                console.log({OrderId}, 7);
                let inputOrderId = await OrderItem.update(input, {
                    where: {
                        id: allItems[i].id
                    },
                })
                console.log(inputOrderId);
            }
            res.status(201).json(invoice)
        } catch (error) {
            console.log(error);
        }
    }

    static async inputOrderId(req,res,next){
        try {
            
            res.status(200).json(allItems)
        } catch (error) {
            console.log(error);
            next (error)
        }
        
    }

    static async showInvoice(req, res, next){
        try {
            let targetedId = req.params.id
            console.log(targetedId);
            console.log(req.user.id);
            let selectedOrder = await Order.findOne({
                where:{
                    CustomerId:req.user.id,
                    id:targetedId
                },
                include:[Customer, OrderItem, {
                    model: Plan, 
                    throuh: 'PlanId'
                }]
            })
            res.status(200).json(selectedOrder)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async payment(req, res, next){
        try {
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : process.env.SERVER_PAY
        });
        let targetedId = req.params.id
        let selectedOrder = await Order.findOne({
            where:{
                CustomerId:req.user.id,
                id:targetedId
            },
            include:[Customer, OrderItem, {
                model: Plan, 
                throuh: 'PlanId'
            }]
        })
        let prefix = 113333555555
        let id = ( prefix + selectedOrder.id)

        let items = selectedOrder.Plans.map((plan)=>{
            let item = {
                name: plan.name,
                price: plan.price,
                quantity: plan.OrderItem.quantity,
                priceSum: plan.OrderItem.priceSum
            }
            return item
        })
        let parameter = {
            transaction_details: {
                order_id: id,
                gross_amount: selectedOrder.totalPrice
            },
            credit_card:{
                secure : true
            },
            item_details: items,
            customer_details: {
                username: selectedOrder.Customer.username,
                email: selectedOrder.Customer.email,
                address: selectedOrder.Customer.address
            }
        };

        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
                console.log('transactionToken:',transactionToken);
                res.status(200).json({
                    token_payment: transactionToken
                })
            })

        } catch (error) {
            console.log(error);
        }
    }

    static async getRecommendation(req, res, next){
        try {
            console.log('hit');
            let {productname} = req.query
            const {data} = await axios({
                method:"GET",
                url: "https://house-plants.p.rapidapi.com/common/"+productname,
                headers:{
                    'X-RapidAPI-Key': '6f3f5b72cemsh8c9794b396a8dc5p165e9djsn0d995e553cb2',
                    'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
                }
            })
            console.log(data);
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = OrderController