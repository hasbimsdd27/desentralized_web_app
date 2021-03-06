const path = require('path');
const fs = require('fs');
const solc = require('solc');

const LotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const source = fs.readFileSync(LotteryPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};


const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['Lottery.sol']['Lottery'];
fs.writeFile('contractFile.json', JSON.stringify(contractFile), 'utf8', (err) => {
  if (err) throw err;
  console.log('Created json file')
});
//   // Export Contract Data
