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
        return this.axios.get('/12.17.1/data/es_ES/item.json').then((res) => {
            const itemsObj = res.data.data
            let keys = Object.keys(itemsObj)
            return getSixItems(keys)
        })
    }


    getChampion() {
        return this.axios.get('/12.17.1/data/es_ES/champion.json').then((res) => {
            const champions = res.data.data
            let keys = Object.keys(champions)
            return getOneChamp(keys)

        })
    }
}

module.exports = new DDragonService()