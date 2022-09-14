const { User, Bookmark, Iphone } = require("../models");
const { Op } = require("sequelize");

class IPhone {
  static async iphone(req, res, next) {
    try {
      let phone = await Iphone.findAll();
      res.status(200).json(phone);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async myOrder(req, res, next) {
    try {
      let order = await Bookmark.findAll({
        where: { UserId: +req.user.id },
        include: [
          {
            model: User,
          },
          {
            model: Iphone,
          },
        ],
        attributes: ['id', 'UserId', 'IphoneId', 'color', 'capacity']
      });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async addOrder(req, res, next) {
    try {
      const { iphoneId } = req.params;
      let iphone = await Iphone.findByPk(iphoneId);
      const {capacity, color} = req.body
      if (!iphone) {
        res.status(404).json({ message: "Course not found" });
      }

      let addBookmark = await Bookmark.findOrCreate({
        where: {
          [Op.and]: [
            {IphoneId: iphoneId},
            {UserId: +req.user.id},
            {capacity},
            {color}
          ]
        },
        defaults: {
          IphoneId: iphoneId,
          UserId: +req.user.id,
          capacity,
          color
        }
      });

      res.status(201).json(addBookmark);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async deleteOrder (req, res, next) {
    try {
      console.log(req.params.orderId)
      await Bookmark.destroy({where: 
        {id: +req.params.orderId}
      })
      res.status(200).json({message: "Order has been Cancelled"})
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = IPhone;
