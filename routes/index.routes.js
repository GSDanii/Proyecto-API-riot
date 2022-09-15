const axios = require('axios');
const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const DDragonService = require("../services/ddragon.service");
const apiRiotService = require("../services/api-riot.service")
const getChampionId = require("../utils/getChampionId")


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
      // console.log(nameAndImg)
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
      // console.log(itemsAndChamp)
      res.render('index/random', itemsAndChamp)
    })
    .catch(e => console.log(e))

});

router.get("/weeklyRotation", roleValidation(ROLES), (req, res, next) => {
  let ids
  let infoChampion
  apiRiotService
    .getWeeklyChampion()
    .then((id) => {
      ids = id
      return DDragonService.getChampionInfo()
    })
    .then((champions) => {
      infoChampion = champions
      console.log(getChampionId.toString())
      let prueba = getChampionId(ids, champions)
      const images = prueba.map((e) => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${e}_0.jpg`)
      let nameAndImg = prueba.map((name, i) => {
        return { name, 'img': images[i] }
      })
      console.log(nameAndImg)
      res.render("index/rotation", { nameAndImg });
    })
    .catch((err) => next(err));
});

router.get("/champion-details/:championName", roleValidation(ROLES), (req, res, next) => {
  let champName = req.params.championName
  DDragonService
    .getDetailsChampions(champName)
    .then((champion) => {
      const image = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`
      let oneChampion = champion[champName]
      let championData = { image, oneChampion }
      console.log(championData)
      res.render("index/champion-details", championData)
    })
    .catch((err) => next(err));
})

module.exports = router;



