function getOneChampion(champions) {

    let randomChamp = []
    for (let i = 0; i < 1; i++) {
        const randomNum = (Math.floor(Math.random() * champions.length))
        const index = champions[randomNum]
        randomChamp.push(index)
    }
    return randomChamp

}

module.exports = getOneChampion;

