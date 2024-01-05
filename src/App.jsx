import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(7);
  const [numbers, setNumbers] = useState(false);
  const [password, setPassword] = useState('');
  const [symbol, setSymbol] = useState(false);
  const [uppercase, setUppercase] = useState(false); 
  const [lowercase, setLowercase] = useState(false); 

  function includeNumbers(e) {
    setNumbers(e.target.checked);
  }

  function includeSymbol(e) {
    setSymbol(e.target.checked);
  }

  function includeUppercase(e) {
    setUppercase(e.target.checked);
  }

  function includeLowercase(e) {
    setLowercase(e.target.checked);
  }

  useEffect(() => {
    generatePassword();
  }, [length, numbers, symbol, uppercase, lowercase]);

  useEffect(() => {
    copyPassword();
  }, [password]);

  function generatePassword() {
    let charSet = '';
    let generatedPassword = ''; 

    const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
    const numbersCharset = '0123456789';
    const symbolCharset = '!@#$%^&*()_+=';

    if (uppercase) {
      charSet += uppercaseCharset;
    }

    if (lowercase) {
      charSet += lowercaseCharset;
    }

    if (numbers) {
      charSet += numbersCharset;
    }

    if (symbol) {
      charSet += symbolCharset;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  }

  function copyPassword() {
    navigator.clipboard.writeText(password)
      .then(() => {
        console.log('Password copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard: ', error);
      });
  }

  return (
    <>
      <div className='main-container'>
        <h2>Generate Password</h2>
        <div className='Ui-container'>
          <label htmlFor="length">Length: {length}</label>
          <input type="range" length min="7" max="20" value={length} onChange={(e) => setLength(Number(e.target.value))} />
          <h1>{password}<button onClick={copyPassword}>Copy</button></h1>
          <label htmlFor="number">Add Number</label>
          <input type="checkbox" checked={numbers} onChange={includeNumbers} />
          <br />
          <label htmlFor="symbol">Add Symbol</label>
          <input type="checkbox" checked={symbol} onChange={includeSymbol} />
          <br />
          <label htmlFor="uppercase">Uppercase</label>
          <input type="checkbox" checked={uppercase} onChange={includeUppercase} />
          <br />
          <label htmlFor="lowercase">Lowercase</label>
          <input type="checkbox" checked={lowercase} onChange={includeLowercase} />
        </div>
      </div>
    </>
  );
}

export default App;
