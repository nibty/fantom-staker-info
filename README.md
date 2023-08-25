## X1 Staker Info

X1 delegators have a hard time finding the right validators to delegator their XN to. The community started some efforts to create more transparency and collect more information about validators but nothing was nice and easy to use. There also were issues keeping the data up-to-date because it was maintained in a centralized manner.

## Update your validator info

### Config File

Create a config file in `JSON` format that contains the following parameters (you can also leave parameters empty):

```js
{
  "name": "VALIDATOR_NAME", /* Name of the validator */
  "logoUrl": "LOGO_URL", /* Validator logo (PNG|JPEG|SVG) - 100px x 100px is enough */
  "website": "WEBSITE_URL", /* Website icon on the right */
  "contact": "CONTACT_URL" /* Contact icon on the right */
}

/* It could look something like this 👇 */

{
  "name": "block42",
  "logoUrl": "https://files.b42.tech/fantom/block42.png",
  "website": "https://block42.tech",
  "contact": "https://t.me/block42_fantom"
}
```

Then host it somewhere so it is publicly accessible!

### Update your info in the smart contract

1. Connect to your validator node
2. Open up a x1 console session via `x1 attach`
3. Load the StakerInfo contract ABI and instantiate the contract

```solidity
abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_stakerContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"stakerID","type":"uint256"}],"name":"InfoUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakerInfos","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_stakerContractAddress","type":"address"}],"name":"updateStakerContractAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_configUrl","type":"string"}],"name":"updateInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_stakerID","type":"uint256"}],"name":"getInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]')
stakerInfoContract = web3.ftm.contract(abi).at("STAKER_INFO_CONTRACT_ADDRESS")
```

4. Call the `updateInfo` function of the StakerInfo contract (make sure you have enough XN on your wallet to cover the transaction fee)

```solidity
stakerInfoContract.updateInfo("CONFIG_URL", { from: "VALIDATOR_ADDRESS" })
// e.g.: stakerInfoContract.updateInfo("https://files.b42.tech/fantom/config.json", { from: "0xa4ddde0afdaea05a3d5a2ec6b5c7f3fc9945020b" })
```

5. Validate if you updated your info correctly

```solidity
stakerInfoContract.getInfo(STAKER_ID)
// e.g.: stakerInfoContract.getInfo(14)
```

