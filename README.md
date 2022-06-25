## newHephaestus
A framework which helps artists to express their emotions towards real world problems through the world of dynamic NFTs. 

![newHephaestus (logo)](https://user-images.githubusercontent.com/93882929/171053446-b97a2a13-3ad8-4caa-bf0a-9defdd78ab54.png)
 
 This project uses [Ceramic TileDocument Streams](https://developers.ceramic.network/reference/stream-programs/tile-document/) instead of 'normal' NFT metadata stored on [IPFS](https://nft.storage/). This allows images in NFTs to be dynamic and change on data provided by API (here https://aqicn.org/api/ is used to provide aqi data). This is done by updating those streams by changing IPFS link to an image in Ceramic Stream.
 
 # Before implementation:
 ### npm install - installing all required packages
 ### ceramic daemon - to run local node for ceramic network
 ### glaze did:create - required installed glaze
 ### export DID_KEY=[seed generated with glaze must go here]
 
 # How to implement?
 A script has 2 entry points.
 getStreamID() - returns streamID (ceramic://...) which can be used while minting NFT instead of IPFS link (ipfs://...) to NFT metadata. 
 startChange(x) - called while minting NFT to start updating NFTs. x -> how often will NFT update (in miliseconds)
 
 You can find an example of implementation in branch [example](https://github.com/Kirillr-Sibirski/newHephaestus/tree/example). It is merges with [this](https://learn.figment.io/tutorials/mint-nfts-on-tezos#next-steps) ([github](https://github.com/PriyanshuDangi/Tutorial_Mint_NFTs)) tutorial for simplicity.
