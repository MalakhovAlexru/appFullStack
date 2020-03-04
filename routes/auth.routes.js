const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const router = Router();

// signup
router.post(
  "/signup",
  [
    check("email", "Некоректный email").isEmail(),
    check("password", "Некоретный пароль").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоретные данные при регистрации"
        });
      }

      const { firstName, lastName, email, password } = req.body;

      const candidate = await User.findOne({
        email
      });

      if (candidate) {
        return res.status(400).json({
          message: "Пользователь существует"
        });
      }

      const hashedPassword = (await bcrypt.hash(password, 12)).toString();
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      await user.save();
      res.status(201).json({
        message: "Пользователь создан"
      });
    } catch (e) {
      res.status(500).json({
        message: "Ошибка на сервере"
      });
    }
  }
);

// login
router.post(
  "/login",
  [
    check("email", "Некоректный email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Некоретный пароль").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоретные данные при входе в систему"
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({
        email
      });

      if (!user) {
        return res.status(400).json({
          message: "Пользователь не найден"
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Неверный пароль"
        });
      }

      const token = jwt.sign(
        {
          userId: user.id
        },
        config.get("jwtSecret"),
        {
          expiresIn: "1h"
        }
      );

      user.token = token;
      await user.save();

      res.status(200).json({
        token,
        userId: user.id,
        message: "Вы авторизованы в системе"
      });
    } catch (e) {
      res.status(500).json({
        message: "Ошибка на сервере"
      });
    }
  }
);

// logout
router.post("/logout", async (req, res) => {
  try {
    const { Id } = req.body.userId;
    const user = await User.findOne({
      Id
    });

    if (!user.token || !user) {
      res.status(401).json({
        message: "Пользователь не авторизован"
      });
    }

    const token = null;

    user.token = token;
    await user.save();

    res.status(200).json({
      message: "Вы вышли из системы"
    });
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере"
    });
  }
});

//GET userObject

router.get("/", async (req, res) => {
  try {
    const { Id } = req.body.Id;
    const userObj = await User.find({ Id });

    if (!userObj) {
      return res.status(400).json({
        message: "Пользователя с таким Id нет"
      });
    }

    return res.status(200).json({
      userObj
    });
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере"
    });
  }
});

module.exports = router;
