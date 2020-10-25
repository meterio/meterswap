let fs = require('fs')
let charge_pair = '0x75029090907214Fe8CB9b97c071447829A7DB28c'
let abi_file = 'Charge.json'

// provider
const Web3 = require('web3')
const web3 = new Web3('wss://winter-blue-bird.rinkeby.quiknode.pro/e34bc2ca553b19850bede324bfd57c076c05e04c/')

// read abi file
let token_abi = fs.readFileSync(abi_file).toString()
let tokenAbi = JSON.parse(token_abi)
contractInstance = new web3.eth.Contract(tokenAbi, charge_pair)

// get all event
contractInstance.events.allEvents({}, (error, result) => {
  if (error) {
    console.log(error)
  } else {
    console.log(result)
  }
})

// call methods
contractInstance.methods._LP_FEE_RATE_().call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._TARGET_BASE_TOKEN_AMOUNT_().call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._TARGET_QUOTE_TOKEN_AMOUNT_().call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods.getOraclePrice().call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods.getQuoteCapitalBalanceOf('0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD').call({}).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})
