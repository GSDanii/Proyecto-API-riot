const axios = require('axios');
const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const DDragonService = require("../services/ddragon.service");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/championsList", roleValidation(ROLES), (req, res, next) => {
  DDragonService
    .getAllChampions()
    .then(champions => {
      const championImages = champions.map((champImage) => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champImage}_0.jpg`)
      let nameAndImg = champions.map((name, i) => {
        return { name, 'img': championImages[i] }
      })
      console.log(nameAndImg)
      res.render("index/champions", { nameAndImg });
    })
    .catch(e => console.log(e))
});

router.get("/randomPick", roleValidation(ROLES), (req, res, next) => {
  let items = {}
  DDragonService
    .getItemKeys()
    .then(randomKeys => {
      const images = randomKeys.map((e) => `http://ddragon.leagueoflegends.com/cdn/12.17.1/img/item/${e}.png`)
      items = images
      return DDragonService.getChampion()
    })
    .then(randomChamp => {
      const image = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${randomChamp}_0.jpg`
      const itemsAndChamp = { items, randomChamp, image }
      console.log(itemsAndChamp)
      res.render('index/random', itemsAndChamp)
    })
    .catch(e => console.log(e))

});

router.get("/weeklyRotation", roleValidation(ROLES), (req, res, next) => {
  res.render("index/rotation");
});

module.exports = router;
