import React, { useState } from 'react'
import './App.css'

interface MyButtonProps {
	val: string;
	id: string;
	handleClick: (val: string) => void;
}

const MyButton: React.FC<MyButtonProps> = ({ val, id, handleClick }) => {
	return (
		<button id={id} onClick={() => handleClick(val)}>
			{val}
		</button>
	);
};



function App() {
	const [calculation, setCalculation] = useState("");
	const [output, setOutput] = useState("");
	const trimmedCalculation = calculation.trim();

	const isOperator = (val: string) => {
		// minus sign put at the end to prevent creating a range
		return /[+*/-]/.test(val);
	}

	const handleClick = (val: string) => {
		if (val === "AC") {
			setCalculation("0");
			setOutput("");
		}
		// Cases for +-*/
		else if (isOperator(val)) {
			const lastChar = trimmedCalculation.charAt(trimmedCalculation.length - 1);
			// -3 accounts for the space we appended after the operator
			const secondLastChar = trimmedCalculation.charAt(trimmedCalculation.length - 3); 

			// Don't allow an operator to follow a d.p.
			if (lastChar === ".") return;
			// Replace previous operators when given a third
			else if (isOperator(lastChar) && isOperator(secondLastChar)) {
				setCalculation(trimmedCalculation.substring(0, trimmedCalculation.length - 3) + " " + val + " ");
			}
			// Case where the operator is replaced
			else if (/[+*/-]/.test(lastChar) && val !== "-") {
				setCalculation(trimmedCalculation.substring(0, trimmedCalculation.length - 1) + " " + val + " ");
			}
			else {
				setCalculation(trimmedCalculation + " " + val + " ");
			}
			//
		}
		else if (val === "=") {
			calculate();
		}
		else if (val === ".") {
			const lastNumber = calculation.split(/[+*/-]/g).pop();
			if (lastNumber?.includes(".")) return;
			setCalculation(calculation + val);
		}
		else {
			if (calculation === "0") {
				setCalculation(val);
			}
			else {
				setCalculation(calculation + val);
			}
		}
	}

	const calculate = () => {
		//If last char is an operator - Do nothing
		if (isOperator(trimmedCalculation.charAt(trimmedCalculation.length - 1))) return;
		else if (isOperator(trimmedCalculation.charAt(0))) {
			setOutput(eval(output + " " + trimmedCalculation));
			setCalculation("");
		}
		else {
			setOutput(eval(trimmedCalculation));
			setCalculation("");
		}
	
	}



	//can use textContent to retrieve the inner text
	return (
		<div>
			<h1>CalculatorJS</h1>
			<div className="grid-container">
				<div id="display">
					<div id="output">{output}</div>
					<div>{calculation}</div>
				</div>
				<div className="grid-row">
					<MyButton val="AC" id="clear" handleClick={handleClick} ></MyButton><MyButton val="/" id="divide" handleClick={handleClick}></MyButton>
				</div>
				<div className="grid-row">
					<MyButton val="7" id="seven" handleClick={handleClick}></MyButton><MyButton val="8" id="eight" handleClick={handleClick}></MyButton><MyButton val="9" id="nine" handleClick={handleClick}></MyButton><MyButton val="*" id="multiply" handleClick={handleClick}></MyButton>
				</div>
				<div className="grid-row">
					<MyButton val="4" id="four" handleClick={handleClick}></MyButton><MyButton val="5" id="five" handleClick={handleClick}></MyButton><MyButton val="6" id="six" handleClick={handleClick}></MyButton><MyButton val="-" id="subtract" handleClick={handleClick}></MyButton>
				</div>
				<div className="grid-row">
					<MyButton val="1" id="one" handleClick={handleClick}></MyButton><MyButton val="2" id="two" handleClick={handleClick}></MyButton><MyButton val="3" id="three" handleClick={handleClick}></MyButton><MyButton val="+" id="add" handleClick={handleClick}></MyButton>
				</div>
				<div className="grid-row">
					<MyButton val="0" id="zero" handleClick={handleClick}></MyButton><MyButton val="." id="decimal" handleClick={handleClick}></MyButton><MyButton val="=" id="equals" handleClick={handleClick}></MyButton>
				</div>
			</div>
		</div>
	)
}

export default App


{/*
		Need case for when an operation is set, retrieve combine num1&2 and work out the new num2 to combine.
		Use Number() to convert string to any form of number incl decimals and negatives
		Need to reset operation, decimal & negative Flags

		// Subsequent State Case
		else {
		if (val === "AC") {
			setCalculation("0");
		}
		else if (val === ".") {
			if (decimalFlag) {
				// Do nothing
			} else {
				setNum2(num2.concat(val));
				setDecimalFlag(true);
			}
		}
		// Operations case
		else if (operations.includes(val)) {
			setDecimalFlag(false);
			// first assignment to num1
			if (num1 === "" && num2 !== "") {
				setNum1(num2);
				setNum2("");
			}
			// Double operations case
			else if (operations.includes(prevInput)) {
				if (val === "-") {
					if (negativeFlag) {
						// Do nothing, can't have more than two negatives together
					}
					else {
						setCalculation(calculation.concat(val));
						setNegativeFlag(true);
						setPreviousInput(val);
					}
				}
				// Non-minus operation case
				else {
					setCalculation(calculation.concat(val));
					setNegativeFlag(false);
				}
			}
			else if (num1 !== "" && num2 !== "") {
				if (val === "+") {
					setNum1((Number(num1) + Number(num2)).toString());
				}
				else if (val === "-") {
					setNum1((Number(num1) - Number(num2)).toString());
				}
				else if (val === "x") {
					setNum1((Number(num1) * Number(num2)).toString());
				}
				else if (val === "/") {
					setNum1((Number(num1) / Number(num2)).toString());
				}
				setNum2("");
				setPreviousInput(val);
				setCalculation(calculation.concat(val));
				setNegativeFlag(false);
			}
		}
		// numbers case
		else {
			setNum2(num2.concat(val));
			setCalculation(calculation.concat(val));
			setPreviousInput(val);
		}
		}
		};		
*/}

{/*
#calculator {
    display: grid;
    grid-template-areas:
        "display display display display"
        "clear negative percentage divide"
        "seven eight nine multiply"
        "four five six subtract"
        "one two three add"
        "zero zero decimal equals";
    grid-template-columns: 100px 100px 100px 100px;
    gap: 20px;
    padding: 10px 50px 50px;
    margin-top: 20px;
    border-radius: 20px;
    background-color: var(--black);	
*/ }