const axios = require('axios');
const getSixItems = require("../utils/getRandomKeys")
const getOneChamp = require("../utils/getChampions")

class DDragonService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://ddragon.leagueoflegends.com/cdn'
        });
    }

    getItemKeys() {
        return this.axios.get('/12.17.1/data/en_US/item.json').then(({ data }) => {
            const itemsObj = data.data
            let keys = Object.keys(itemsObj)
            // Si teneis numeros sobre un json, que pasa cuando pongan nuevos campeones y estos numeros cambien ????
            keys = keys.filter((key) => key > 3000 && key != 3070 && key != 3330 && key != 7050)
            console.log('filtrado', keys)
            return getSixItems(keys)
        })
    }

    getChampion() {
        return this.axios.get('/12.17.1/data/en_US/champion.json').then((res) => {
            const champions = res.data.data
            let championKeys = Object.keys(champions)
            return getOneChamp(championKeys)

        })
    }

    getAllChampions() {
        return this.axios.get('/12.17.1/data/en_US/champion.json').then((res) => {
            const champions = res.data.data
            let keys = Object.keys(champions)
            return keys
        })
    }

    // Es getDetailsChampions o getDetailChampion ?? solo veo 1 nombre pero la funcion es en plural
    // Si devuyelve muchos champions en base a un nombre algo mas claro tipo getDetailsChampionsQueryByName o algo asi
    // Al leer algo en plural, mi intuicion me dice pasar muchas cosas en el argumento, y no solo 1 nombre
    getDetailsChampions(name) {
        return this.axios.get(`/12.17.1/data/en_US/champion/${name}.json`).then((res) => {
            const champions = res.data.data
            return champions
        })
    }

    // Si es solo getChampionInfo , tendria que tener un parametro para devolver 1 solo champion. Esto creo que deberia ser getInfoChampions()
    getChampionInfo() {
        return this.axios.get('/12.17.1/data/en_US/champion.json').then((res) => {
            const champions = res.data.data
            return champions
        })
    }

}

module.exports = new DDragonService()


