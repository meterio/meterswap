let fs = require('fs')
let charge_factory = '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD'
let abi_file = './ChargeFactory.json'

// provider
const Web3 = require('web3')
const web3 = new Web3('wss://winter-blue-bird.rinkeby.quiknode.pro/e34bc2ca553b19850bede324bfd57c076c05e04c/')

// read abi file
let token_abi = fs.readFileSync(abi_file).toString()
let tokenAbi = JSON.parse(token_abi)
contractInstance = new web3.eth.Contract(tokenAbi, charge_factory)

// get all event
contractInstance.events.allEvents({}, (error, result) => {
  if (error) {
    console.log(error)
  } else {
    console.log(result)
  }
})

// call methods
contractInstance.methods.getCharges().call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._Charge_LOGIC_().call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._Charges(0).call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

