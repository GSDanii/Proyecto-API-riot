function getRandomKeys(itemFilter) {

    let randomKeys = []
    // Porque 6 ?? es porque solo se devuelven 6 keys ? entonces ponerlo en una constante o algo quye se sepa y otra persona lo entienda
    for (let i = 0; i < 6; i++) {
        const randomNum = (Math.floor(Math.random() * itemFilter.length))
        const index = itemFilter[randomNum]
        randomKeys.push(index)
    }
    return randomKeys
}

module.exports = getRandomKeys;