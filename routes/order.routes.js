const { Router } = require("express");

// Промежуточное ПО проверки авторизации пользовтаеля и запросов для фронта
// const auth = require("../middleware/auth.middleware");
//
const Order = require("../models/Order");

const router = Router();

// order (in req send Id of Order)
router.post("/", async (req, res) => {
  try {
    const { Id, serviceName, targetUrl, Price, serviceActions } = req.body;

    const protoOrder = await Order.findOne({
      Id
    });

    if (protoOrder) {
      return res.status(400).json({
        message: "Заказ с таким ID существует"
      });
    }

    const order = new Order({
      Id,
      serviceName,
      targetUrl,
      Price,
      serviceActions
    });

    await order.save();

    res.status(201).json({
      message: "Заказ создан"
    });
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере"
    });
  }
});

// Get arrayOrderObj (clear req)
router.get("/", async (req, res) => {
  try {
    const arrayOrderObj = await Order.find();

    if (!arrayOrderObj) {
      return res.status(400).json({
        message: "Заказов нет"
      });
    }

    return res.status(200).json({
      arrayOrderObj
    });
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере"
    });
  }
});

module.exports = router;
