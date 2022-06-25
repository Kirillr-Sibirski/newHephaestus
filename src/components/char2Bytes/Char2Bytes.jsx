import React, {useState} from 'react';
import {char2Bytes} from '@taquito/tzip16';
import styleClasses from './styles.module.css';

const Char2Bytes = () => {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState(false);

    const onChange = (event) => {
        setInput(event.target.value);
    };

    const copyText = () => {
        navigator.clipboard.writeText(char2Bytes(input));
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 600);
    };

    return (
        <div className={styleClasses.container}>
            <div className="container">
                <div>
                    <h1>Char 2 Bytes</h1>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        String
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="String"
                        aria-label="string"
                        aria-describedby="basic-addon1"
                        onChange={onChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">
                        Bytes
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="string"
                        aria-describedby="basic-addon2"
                        value={char2Bytes(input)}
                        disabled
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={copyText}
                        disabled={copied}
                    >
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Char2Bytes;
