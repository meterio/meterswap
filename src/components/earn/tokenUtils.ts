
import Web3 from 'web3'

const theta_rpc = 'https://eth-rpc-api.thetatoken.org/rpc'
const meter_rpc = 'https://rpc.meter.io'
const moonbeam_rpc = 'https://moonbeam.api.onfinality.io/public'



export const getTokenSymbol = async (tokenAddress: string, chainId:number) => {
    const web3s = new Web3(new Web3.providers.HttpProvider(
        chainId === 1284 ? moonbeam_rpc : chainId === 361 ? theta_rpc : meter_rpc
    ));

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

  

export const getTokenDecimal = async (tokenAddress: string, chainId:number) => {
    
    const web3s = new Web3(new Web3.providers.HttpProvider(
        chainId === 1284 ? moonbeam_rpc : chainId === 361 ? theta_rpc : meter_rpc
    ));
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

export const getTokenName = async (tokenAddress: string,chainId:number) => {
    const web3s = new Web3(new Web3.providers.HttpProvider(
        chainId === 1284 ? moonbeam_rpc : chainId === 361 ? theta_rpc : meter_rpc
    ));

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