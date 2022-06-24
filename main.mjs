import { CeramicClient } from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { fromString } from "uint8arrays";
import fetch from "node-fetch";

const key = fromString(process.env.DID_KEY, "base16"); // gets did key from saved in console
const did = new DID({
    provider: new Ed25519Provider(key),
    resolver: getResolver(),
});
await did.authenticate();
const ceramic = new CeramicClient("http://localhost:7007");
ceramic.did = did;

// Create a new tile isong the data model
const nft1 = {
    name: "Environmental NFT",
    symbol: "ENV",
    description: "described",
    decimals: 0,
    isTransferable: true,
    shouldPreferSymbol: false,
    isBooleanAmount: true,
    artifactUri: "ipfs://bafkreiezptgh36vfxpsux4ebj3oyvpephpmhabey2v2p4yuwzkzjyzynqq",
    displayUri: "ipfs://bafkreiezptgh36vfxpsux4ebj3oyvpephpmhabey2v2p4yuwzkzjyzynqq",
    thumbnailUri: "ipfs://bafkreiezptgh36vfxpsux4ebj3oyvpephpmhabey2v2p4yuwzkzjyzynqq",
    creators: ["sibirski"]
}

const document = await TileDocument.create(ceramic, {"NFT": nft1}) // creating a stream
const streamID = document.id; // streamID
const doc = await TileDocument.load(ceramic, streamID) // load a tile document to work with
console.log("streamID: ", doc.id) // copy id, paste into NFT metadata in smart contract 

// Connecting to an API (real-time air quality index)
setInterval(getData, 1000);
async function getData() {
    const response = await fetch(
        'https://api.waqi.info/feed/barcelona/?token=b4738dd40c9bceef2034dd1f4dd15c77b273c804'
    );
    const converted = await response.json();
    const data = parseInt(converted.data.aqi);
    var image = "ipfs://bafkreigfzwfg7y5l3yjeutu6ur647fpr4gsya6jafvoplgxpxrvnurwpae";
    switch (true) {
        case (data<75): // Good/Moderate
            image = "ipfs://bafkreicd4t5ihcmdcsjeucg2dopj6kta5qc5t3q25ytl7v3kv57ryycu7q"
            break;
        case (data<150 && data >=75): // Moderate/Unhealthy for sensitive groups
            image = "ipfs://bafkreiddipkceuqysxvuksxen35n4ykitl675nprz7k63kadnru6vjoydi"
            break;
        case (data<300 & data >=150): // Very unhealthy 
            image = "ipfs://bafkreigfzwfg7y5l3yjeutu6ur647fpr4gsya6jafvoplgxpxrvnurwpae"
            break;
        case (data>300): // Hazardous
            image = "ipfs://bafkreicenx3emsa4mcirwi2y6n7opm3vdflng7inyrajk4c5uwhewrpimy"
            break;
    }
    // Update links in metadata
    var updated_nft = nft1;
    updated_nft.artifactUri = image;
    updated_nft.displayUri = image;
    updated_nft.thumbnailUri = image;

    await doc.update({"NFT": updated_nft})// changes link to images in ceramic stream
}