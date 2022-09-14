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
            keys = keys.filter((key) => key > 3000 && key !== (3070, 3330, 7050))
            console.log('filtrado', keys)
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

    getAllChampions() {
        return this.axios.get('/12.17.1/data/es_ES/champion.json').then((res) => {
            const champions = res.data.data
            let keys = Object.keys(champions)
            return keys
        })
    }

    getDetailsChampions(name) {
        return this.axios.get(`/12.17.1/data/es_ES/champion/${name}.json`).then((res) => {
            const champions = res.data.data
            return champions
        })
    }
}

module.exports = new DDragonService()


