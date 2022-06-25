import {NFTStorage, File} from 'nft.storage';

const symbol = 'TUT';

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDliMTFDOTlFZDdENTQzNDlCRWExNzY2YjAwMDllOGQ3MDdhMGY5NzgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDgwMTY2OTA1MywibmFtZSI6InRlc3RfbmZ0In0.bKT8ub0fLBWTWi9pyyaUK57CRRLqoVZ-zqqTqSkTGzU';
const client = new NFTStorage({token: apiKey});

const uploadToIpfs = async (name, description, imgFile) => {
  const metadata = await client.store({
    name: name,
    description: description,
    image: new File([imgFile], imgFile.name, {type: imgFile.type}),
    symbol: symbol,
    decimals: 0,
    shouldPreferSymbol: false,
    isBooleanAmount: true,
    artifactUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
    displayUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
    thumbnailUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
    creators: ['priyanshu'],
  });
  return metadata.url;
};

export {uploadToIpfs};