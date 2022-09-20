// Si retorna un champion random, poner eso como nombre getOneRandomChamp
function getOneChampion(champions) {
    // return champions[Math.floor(Math.random() * champions.length)]; 1 linea vs 3
    const randomNum = (Math.floor(Math.random() * champions.length))
    const randomChamp = champions[randomNum]
    return randomChamp
}

module.exports = getOneChampion;

