
import Web3 from 'web3'
const rpcUrl = 'https://rpc.meter.io'



export const getTokenSymbol = async (tokenAddress: string) => {
    const web3s = new Web3(new Web3.providers.HttpProvider(rpcUrl));

    let contract = new web3s.eth.Contract([
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
      ])
    contract.options.address = tokenAddress


    const symbol = await contract.methods.symbol().call()
    return symbol



}

  

export const getTokenDecimal = async (tokenAddress: string) => {
    const web3s = new Web3(new Web3.providers.HttpProvider(rpcUrl));

    let contract = new web3s.eth.Contract([
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint8" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          }
      ])
    contract.options.address = tokenAddress


    const decimals = await contract.methods.decimals().call()
    return decimals



}

export const getTokenName = async (tokenAddress: string) => {
    const web3s = new Web3(new Web3.providers.HttpProvider(rpcUrl));

    let contract = new web3s.eth.Contract([
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          }
      ])
    contract.options.address = tokenAddress


    const name = await contract.methods.name().call()
    return name



}