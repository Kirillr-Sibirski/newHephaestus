import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectLoaded, selectStorage} from '../../store/reducers/storage';

const Card = (props) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};
const Home = () => {
    const loaded = useSelector(selectLoaded);
    const storage = useSelector(selectStorage);
    const [nfts, setNfts] = useState([]);
  
    useEffect(() => {
      const func = async () => {
        let tokens = [];
        for (let i = 0; i < storage.length; i++) {
          if (storage[i].url) {
            let token = {};
            token.token_id = storage[i].token_id;
            const response = await axios.get('https://ipfs.io/ipfs/' + storage[i].url.slice(7));
            let data = response.data;
            token.name = data.name;
            token.description = data.description;
            if (data.artifactUri) token.img = 'https://ipfs.io/ipfs/' + data.artifactUri.slice(7);
            tokens.push(token);
          }
        }
        setNfts(tokens);
        console.log('storage set!');
      };
      if (loaded) {
        func();
      }
    }, [loaded]);
  
    return (
      <div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {nfts.map((nft, index) => {
            return <Card {...nft} key={index} />;
          })}
        </div>
      </div>
    );
  };
  
  export default Home;