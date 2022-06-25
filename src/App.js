import React, {useEffect} from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getNFTs} from './utils/wallet';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Mint from './components/mint/Mint.jsx';
import Home from './components/home/Home.jsx';
import Char2Bytes from './components/char2Bytes/Char2Bytes.jsx';

// import {getNFTs} from './utils/wallet';
import Navbar from './components/navbar/Navbar.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectLoaded, setStorage} from './store/reducers/storage.js';

const App = () => {
    const loaded = useSelector(selectLoaded);
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const func = async () => {
                const nfts = await getNFTs(); // will import and uncomment
                dispatch(setStorage(nfts));
            };
            if (!loaded) {
                func();
            }
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, loaded]);

    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact component={Char2Bytes} path="/char2Bytes" />
                    <Route exact component={Mint} path="/mint" />
                    <Route exact component={Home} path="/" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
