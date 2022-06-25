# Example of implementation of newHephaestus framework
Framework has been implemented into [this](https://learn.figment.io/tutorials/mint-nfts-on-tezos#next-steps) ([github](https://github.com/PriyanshuDangi/Tutorial_Mint_NFTs)) for simplicity and good explanation of what is happening on application side.
## How to run?
- Don't forget to change DID in `ceramic.mjs` file, line 10 to yours by running `glaze did:create` and copying seed
- Go to `ceramic.mjs` file and change API/IPFS links to images/name/description/symbol if necessary (for test you can leave as it is)
- `yarn start` Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Click on `mint` button and fill in the data. Address - where NFT would be minted to. Name/Description - doesn't do much since we change it in ceramic.mjs file.
