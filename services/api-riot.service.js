const axios = require('axios');

class apiRiotService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://euw1.api.riotgames.com/lol',
            headers: {
                "X-Riot-Token": "RGAPI-3d6ae0d3-0014-4d0e-bef4-920ff0d7fdeb"
            },
        });
    }
    getSummonerInfo(summonerName) {
        let encondeName = encodeURIComponent(summonerName)
        return this.axios
            .get(`/summoner/v4/summoners/by-name/${encondeName}`)
            .then(({ data }) => {
                return data
            })
            .catch(e => console.log(e))
    }

    getSummonerElo(id) {
        return this.axios
            .get(`/league/v4/entries/by-summoner/${id}`)
            .then(({ data }) => data)
            .catch(e => console.log(e))
    }

}

module.exports = new apiRiotService()