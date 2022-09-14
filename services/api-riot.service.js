const axios = require('axios');

class apiRiotService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://euw1.api.riotgames.com/lol',
            headers: {
                "X-Riot-Token": "RGAPI-e17b6639-1f2b-4522-a3c1-468cbe00de8c"
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