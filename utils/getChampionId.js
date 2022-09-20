// Lo que dije antes, no tiene sentido el nombre de esta funcion con lo que retorna
function getChampionId(arr, champions) {
    const champiosNames = []
    // Me resulta raro, ver un for y dentro de un for un forEach. Si champions es una lista de strings, porque no hacerlo tambien con un foreach ?
    // Si lo que quereis es encontrar algo, deberias usar find
    
    for (const property in champions) {
        // const item = arr.find( element => element === champions[property].key)
        // if item {champiosNames.push...}

        arr.forEach((el) => {
            if (el == champions[property].key) {
                champiosNames.push(property)
            }
        })
    }
    return champiosNames

}

module.exports = getChampionId;