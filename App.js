import './App.css';

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});
generateEl.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

function App() {
  return (
    <div>
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <span id="result" />
          <button className="btn" id="clipboard">
            <i className="far fa-clipboard" />
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <label>Password length</label>
            <input type="number" id="length" min={4} max={20} defaultValue={20} />
          </div>
          <div className="setting">
            <label>Include uppercase letters</label> 
            <input type="checkbox" id="uppercase" defaultChecked />
          </div>
          <div className="setting">
            <label>Include lowercase letters</label> 
            <input type="checkbox" id="lowercase" defaultChecked />
          </div>
          <div className="setting">
            <label>Include numbers</label> 
            <input type="checkbox" id="numbers" defaultChecked />
          </div>
          <div className="setting">
            <label>Include symbols</label> 
            <input type="checkbox" id="symbols" defaultChecked />
          </div>
        </div>
        <button className="btn btn-large" id="generate">
          Generate password
        </button>
      </div>
    </div>
  );
}


export default App;
