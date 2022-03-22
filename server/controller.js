const houses = require('./db.json')
let globalID = 4


module.exports = {

    getHouses: (req, res) => {
    res.status(200).send(houses)   
    },

    deleteHouse: (req, res) => {
        let index = houses.findIndex(house => house.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let customPrice = Number('' + price)
        let newHouse = {
            id: globalID,
            address,
            price: customPrice,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        globalID ++
        console.log(houses)
    },

    updateHouse: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        
        let index = houses.findIndex(house => house.id === +id)
 
        if (houses[index].price === 0 && type === 'plus') {
            res.status(400).send('House increased by $10,000')
        } else if (houses[index].price === 0 && type === 'minus'){
            res.status(400).send('House decreased by $10,000')
        } else if (type === 'plus'){
            houses[index].price +=10000
            res.status(200).send(houses)
        }  else if (type === 'minus'){
         houses[index].price -=10000
         res.status(200).send(houses)
     } else {
         res.status(400)
     }
}
}
