// const Web3 = require('web3')
// const contractFile = require('./contractFile.json')
import Web3 from './web3'
import contractFile from './contractFile.json'
const address = '0x898a0B7ffBe7872D99a5342DD438e50F860E6471';
const abi = contractFile.abi
export default new Web3.eth.Contract(abi, address)