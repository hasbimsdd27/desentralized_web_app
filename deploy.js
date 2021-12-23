const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')

const Compile = require('./compile')
const bytecode = Compile.evm.bytecode.object;
const abi = Compile.abi;

const provider = new HDWalletProvider(
    process.env.SECRET_PASSPHRASE,
    process.env.ETH_NETWORK_ENDPOINT,
)

const web3 = new Web3(provider)


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Contract is deployed by the manager with address', accounts[0])
    const result = await new web3.eth.Contract(abi).deploy({ data: '0x' + bytecode }).send({ gas: '2000000', from: accounts[0] })
    console.log('Contract deployed to address', result.options.address)
}

deploy()