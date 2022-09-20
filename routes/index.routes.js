const axios = require('axios');
const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const") // Muchos import sin usar
const DDragonService = require("../services/ddragon.service");
const apiRiotService = require("../services/api-riot.service")
const getChampionId = require("../utils/getChampionId")

/**
 * http://ddragon.leagueoflegends.com es una constante que se repite, la guardaria en el archivo .env en caso de que LOL tenga varios endpoints
 * o al menos lo meteria como constante, en vez de copiar y pegar siempre lo mismo
 * y luego tendria algo aqui tipo 
 * const championSplashPath = 'cdn/img/champion/splash';
 * const itemPath = 'cdn/12.17.1/img/item'
 */


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
      res.render("index/champions", { nameAndImg });
    })
    .catch(e => console.log(e))
});

router.get("/randomPick", roleValidation(ROLES), (req, res, next) => {
  let items = {}
  DDragonService
    .getItemKeys()
    .then(randomKeys => {
      // Para que crear const images y luego items = images ???
      const images = randomKeys.map((e) => `http://ddragon.leagueoflegends.com/cdn/12.17.1/img/item/${e}.png`)
      items = images
      return DDragonService.getChampion()
    })
    .then(randomChamp => {
      const image = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${randomChamp}_0.jpg`
      const itemsAndChamp = { items, randomChamp, image }
      res.render('index/random', itemsAndChamp)
    })
    .catch(e => console.log(e))

});

router.get("/weeklyRotation", roleValidation(ROLES), (req, res, next) => {
  let champIDs
  apiRiotService
    .getWeeklyChampion()
    .then(ids => {
      champIDs = ids
      return DDragonService.getChampionInfo()
    })
    .then((champions) => {
      // Porque getChampionID devuelve nombres ?? no tiene ningun sentido. getChampionID deveria devolver un ID, eso es lo que dce el nombre de la funcion
      // en caso de tener getChampionNames() , cambiaria la logica a esto
      /** Basicamente la funcion map puede tener un return y devolver lo que tu quieras, asi que tener la linea 71 y 72 es totalmente useless */
      // const nameAndImg = getChampionNames(ids, champions).map(champName, index => {
      //   return { name, 'img': images[index] }
      // })
      let champNames = getChampionId(champIDs, champions)
      const images = champNames.map((champName) => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`)
      let nameAndImg = champNames.map((name, i) => {
        return { name, 'img': images[i] }
      })
      res.render("index/rotation", { nameAndImg });
    })
    .catch((err) => next(err));
});

router.get("/champion-details/:championName", roleValidation(ROLES), (req, res, next) => {

  const { championName } = req.params

  DDragonService
    .getDetailsChampions(championName)
    .then((championDetails) => {
      const image = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`
      // Para que usar oneChampion ???
      //  const { name, title, lore, allytips, enemytips, passive, stats } = championDetails[championName]
      let oneChampion = championDetails[championName]
      const { name, title, lore, allytips, enemytips, passive, stats } = oneChampion

      let championData = { image, name, title, lore, allytips, enemytips, passive }
      res.render("index/champion-details", championData)
    })
    .catch((err) => next(err));
})




module.exports = router;



