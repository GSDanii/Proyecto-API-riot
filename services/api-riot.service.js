const axios = require('axios');

class apiRiotService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://euw1.api.riotgames.com/lol',
            headers: {
                "X-Riot-Token": "RGAPI-6d43aafd-5235-413d-bb01-d9247cf99309"
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