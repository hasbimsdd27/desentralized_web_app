const web3 = require('web3')
const contractFile = require('./compile')

const address = '0xB3A1b37aF2B8Ea9543831e4aac98e64d93382468';
const abi = contractFile.abi

module.exports = new web3.eth.Contract(abi, address)