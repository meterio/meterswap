let ERC20_ABI = require('../../../../constants/abis/erc20.json')

let fs = require('fs')
let charge_pair = '0x75029090907214Fe8CB9b97c071447829A7DB28c'
let abi_file = 'Charge.json'

// provider
const Web3 = require('web3')
const web3 = new Web3('wss://winter-blue-bird.rinkeby.quiknode.pro/e34bc2ca553b19850bede324bfd57c076c05e04c/')

// read abi file
let token_abi = fs.readFileSync(abi_file).toString()
let tokenAbi = JSON.parse(token_abi)
let contractInstance = new web3.eth.Contract(tokenAbi, charge_pair)

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
  console.log('_LP_FEE_RATE_', data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._TARGET_BASE_TOKEN_AMOUNT_().call({}).then(function(data) {
  console.log('_TARGET_BASE_TOKEN_AMOUNT_', data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._TARGET_QUOTE_TOKEN_AMOUNT_().call({}).then(function(data) {
  console.log('_TARGET_QUOTE_TOKEN_AMOUNT_', data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._BASE_TOKEN_().call({}).then(function(data) {
  let token = new web3.eth.Contract(ERC20_ABI, data)
  token.methods.symbol().call({}).then(i => console.log('_BASE_TOKEN_', i))
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods._QUOTE_TOKEN_().call({}).then(function(data) {
  let token = new web3.eth.Contract(ERC20_ABI, data)
  token.methods.symbol().call({}).then(i => console.log('_QUOTE_TOKEN_', i))
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods.getOraclePrice().call({}).then(function(data) {
  console.log('getOraclePrice', data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods.getQuoteCapitalBalanceOf('0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD').call({}).then(function(data) {
  console.log('getQuoteCapitalBalanceOf', data)
}).catch(function(err) {
  console.log(err)
})

contractInstance.methods.queryBuyBaseToken('1000000000000000000').call({}).then(function(data) {
  console.log('queryBuyBaseToken', data)
}).catch(function(err) {
  console.log(err)
})
