import { useState}  from 'react';
import './App.css'
import styles from './App.module.css'

function App() {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [input, setInput] = useState('0')
	const [total, setTotal] = useState(false)

    const NUM = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]


	const operatorType = (op) => {
		if (!total) {
			setOperator(op);
			setInput(op);
		} else {
			setOperand1(input);
			setOperand2('');
			setOperator(op);
			setInput(op);
			setTotal(false);
		}

	};
	const inputNum = (num) => {
		if(total) {
			setOperand1(num);
			setInput(num);
			setTotal(false)
		} else if (operator){
			setOperand2(operand2 + num);
			setInput(input + num)
		} else {
			setOperand1(input === '0' && num !== '.' ? num : operand1 + num);
			setInput(input === '0' && num !== '.' ? num : input + num);
		}

	};

	const reset = () => {
		setOperand1('0');
		setOperand2('');
		setOperator('');
		setInput('0');
		setTotal(false);
	};

	const equals = () => {
		if(operator && operand1 && operand2) {
			let result;
			switch (operator) {
				case '+' :
					result = parseFloat(operand1) + parseFloat(operand2)
					break;
				case '-' :
					result = parseFloat(operand1) - parseFloat(operand2)
					break;
				case '*' :
					result = parseFloat(operand1) * parseFloat(operand2)
					break;
				case '/' :
					if (operand2 !== 0) {
						result = parseFloat(operand1) / parseFloat(operand2)
					} else {
						result = 'Error'
					}
					break;
				default:
					result = 'Error'
					break;
			}
			if(result != 'Error') {
				setInput(String(result));
				setOperand1(String(result));
			} else {
				setInput(result);
				setOperand1('')
			}
			setOperand2('');
			setOperator('');
			setTotal(true);
		}
	};


  return (
    <>
      <div className={styles.app}>
			<div className={styles.container_items}>
				<div className={styles.input}>
					<input type="text" value={input} readOnly />
				</div>
				<div className={styles.numbers}>
				{['+', '-', '*', '/'].map((op) => (
              <button key={op} className={styles.button__numberMathButton} onClick={() => operatorType(op)}>{op}</button>
            ))}
            {NUM.map((n) => (
              <button key={n} className={styles.button__number} onClick={() => inputNum(n.toString())}>{n}</button>
            ))}
				<button className={styles.button__number} onClick={() => inputNum('.')}>.</button>
				<button className={styles.button__number} onClick={reset}>АС</button>
				<button className={styles.button__numberEnterButton} onClick={equals}>=</button>
				</div>
			</div>
		</div>
    </>
  )
}



export default App


