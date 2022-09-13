const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/championsList", roleValidation(ROLES), (req, res, next) => {
  res.render("index/champions");
});

router.get("/randomPick", roleValidation(ROLES), (req, res, next) => {
  res.render("index/random");
});

router.get("/weeklyRotation", roleValidation(ROLES), (req, res, next) => {
  res.render("index/rotation");
});

module.exports = router;
