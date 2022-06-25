import React, {useState} from 'react';
import {uploadToIpfs} from '../../utils/upload';

import {mintNFT} from '../../utils/wallet';
import {useSelector} from 'react-redux';
import {selectLoaded, selectStorage} from '../../store/reducers/storage';
console.log('CLI works!');
const Mint = () => {
    const loaded = useSelector(selectLoaded);
    const storage = useSelector(selectStorage);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
const submit = async (event) => {
    try {
        event.preventDefault();
        setLoading(true);
        const address = event.target.address.value;
        const name = event.target.name.value;
        const description = event.target.description.value;
        const file = event.target.image.files[0];

        const ipfsUrl = await uploadToIpfs(name, description, file);
        console.log('Uploaded To IPFS!');
        const token_id = storage.length;
        const op = await mintNFT(address, ipfsUrl, token_id);

        console.log(op);
        setMessage('Minted Successfully!');

        const stor = [...storage];
        stor.push({
        token_id: token_id,
        url: ipfsUrl,
        });

        setLoading(false);
    } catch (err) {
        console.log(err);
        setLoading(false);
        setMessage('Error: Not Able to Mint');
    }
};
const closeMessage = () => {
    setMessage('');
};
return (
    <div className="container">
      {message && (
        <div className="position-fixed top-0 end-0 p-3" style={{zIndex: 11}}>
          <div id="liveToast" className="toast fade show d-flex" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">{message}</div>
            <button type="button" className="btn-close me-2 m-auto" onClick={closeMessage}></button>
          </div>
        </div>
      )}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="tokenID" className="form-label">
            Token ID
          </label>
          <input
            type="number"
            className="form-control"
            id="tokenID"
            aria-describedby="tokenID"
            required
            value={storage.length}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input type="text" className="form-control" id="address" aria-describedby="address" required />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" aria-describedby="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="description" aria-describedby="description" required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input className="form-control" type="file" id="image" accept="image/*" required />
        </div>
        <button type="submit" className="btn btn-primary" >
          {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
          Mint
        </button>
      </form>
    </div>
  );
};

export default Mint;