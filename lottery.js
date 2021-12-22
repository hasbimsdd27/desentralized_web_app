const web3 = require('web3')
const contractFile = require('./compile')

const address = '';
const abi = contractFile.abi

module.exports = new web3.eth.Contract(abi, address)