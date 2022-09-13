const axios = require('axios');

class DDragonService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://ddragon.leagueoflegends.com/cdn'
        });
    }
    getAllItems() {
        return this.axios.get('/12.17.1/data/es_ES/item.json').then((res) => res.data)
    }

}

module.exports = new DDragonService()