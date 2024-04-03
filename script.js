class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.previousOperand=''
        this.currentOperand=''
        this.operation=undefined
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand==='')return
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }
    compute(){
        const prev=parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)
        let computation
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation=prev+curr;
                break;
            case '-':
                computation=prev-curr;
                break;
            case '*':
                computation=prev*curr;
                break;
            case '/':
                computation=prev/curr;
                break;
            default: return
        }
        this.currentOperand=computation;
        this.previousOperand=''
        this.operation=undefined;
    }
    getDisplayNumber(number){
        const strNumber=number.toString()
        const integerDigits=parseFloat(strNumber.split('.')[0])
        const decimalDigits=strNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }else{
            integerDisplay= integerDigits.toLocaleString('hi',{maximumFractionDigits:0})
        }
        if(decimalDigits !=null){
            return `${integerDisplay}.${decimalDigits}`
        }else return integerDisplay;
        
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation != null ){
            this.previousOperandTextElement.innerText=`${this.previousOperand} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText=''
        }
        
    }
}

const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement =document.querySelector('[data-previous-operand]')
const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
    
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})