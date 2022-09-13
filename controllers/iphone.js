const { User, Bookmark, Iphone } = require("../models");

class IPhone {
  static async iphone(req, res, next) {
    try {
      let phone = await iPhone.findAll();
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
      });
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
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

      let addBookmark = await Bookmark.create({
        IphoneId: iphoneId,
        UserId: +req.user.id,
        capacity, color
      });
      let newBookmark = await Bookmark.findOne({
        where: {
          createdAt: addBookmark.createdAt,
        },
      });
      res.status(201).json(newBookmark);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = IPhone;
