let charge_factory = '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD'
let abi_file = '/home/yang/towanghai/ChargeFactory.json'
let address = '0x0205c2D862cA051010698b69b54278cbAf945C0b'
let priv_key = ''

// provider
const Web3 = require('web3')
const web3 = new Web3('wss://winter-blue-bird.rinkeby.quiknode.pro/e34bc2ca553b19850bede324bfd57c076c05e04c/')

// add account
web3.eth.accounts.wallet.add(priv_key)
web3.eth.accounts.wallet

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
contractInstance.methods.breedCharge('0x0205c2D862cA051010698b69b54278cbAf945C0b', '0xBeE85b7b676f9306803B6DFC09F024c30a7A2a1e', '0x4f6D94accF73713968f6D1B3d191A05762BfD2c1', '0xc87670Fc5A7C52971493A08b362B396A67bB40F5', '3500000000000000', 0, '100000000000000000', '100000000000000').send({ from: '0x0205c2D862cA051010698b69b54278cbAf945C0b', gas: 4700000 }).then(function(data) {
  console.log(data)
}).catch(function(err) {
  console.log(err)
})

//
/***
 contractInstance.methods.breedCharge('0x0205c2D862cA051010698b69b54278cbAf945C0b', '0xBeE85b7b676f9306803B6DFC09F024c30a7A2a1e', '0x4f6D94accF73713968f6D1B3d191A05762BfD2c1', '0xc87670Fc5A7C52971493A08b362B396A67bB40F5', '3500000000000000', 0, '100000000000000000', '100000000000000').send({from: address, gas: 4700000 }).then(function(data){console.log(data)}).catch(function(err){console.log(err)})
 ***/
