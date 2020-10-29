let account = ''
let privatkey = ''
let abi_file = ''
let contract_address = '0x26411A2B52C8f3fD330489047992bde860b1f823'
const Web3 = require('web3')
const web3 = new Web3('wss://winter-blue-bird.rinkeby.quiknode.pro/e34bc2ca553b19850bede324bfd57c076c05e04c/')

web3.eth.accounts.wallet.add(privatekey)
web3.eth.accounts.wallet

let token_abi = fs.readFileSync(abi_file).toString()
let tokenAbi = JSON.parse(token_abi)

contractInstance = new web3.eth.Contract(tokenAbi, contract_address)

contractInstance.events.allEvents({}, (error, result) => {
  if (error) {
    console.log(error)
  } else {
    console.log(result)
  }
})

// trade
contractInstance.methods
                .depositBaseTo('0x0205c2D862cA051010698b69b54278cbAf945C0b', '10000000000000000000')
                .send({ from: '0x0205c2D862cA051010698b69b54278cbAf945C0b', gas: 4700000 })
                .then(function(data) {
                  console.log(data)
                }).catch(function(err) {
  console.log(err)
})

contractInstance.methods
                .depositQuoteTo('0x0205c2D862cA051010698b69b54278cbAf945C0b', '5000000000000000000')
                .send({ from: '0x0205c2D862cA051010698b69b54278cbAf945C0b', gas: 4700000 })
                .then(function(data) {
                  console.log(data)
                }).catch(function(err) {
  console.log(err)
})

contractInstance.methods
                .querySellBaseToken('1000000000000000000').call({ from: '0x0205c2D862cA051010698b69b54278cbAf945C0b', gas: 4700000 })
                .then(function(data) {
                  console.log(data)
                }).catch(function(err) {
  console.log(err)
})

contractInstance.methods
                .sellBaseToken('1000000000000000000', '1600000000000000000')
                .call({ from: '0x0205c2D862cA051010698b69b54278cbAf945C0b', gas: 4700000 })
                .then(function(data) {
                  console.log(data)
                }).catch(function(err) {
  console.log(err)
})
