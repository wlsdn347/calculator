const scientificCalculator = {
    display: null,
    currentInput: '',
    operator: null,
    previousInput: '',
    expression: '',

    init: function() {
        this.display = document.getElementById('display-scientific');
        this.bindEvents();
    },

    bindEvents: function() {
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    },

    handleButtonClick: function(event) {
        const value = event.target.innerText;

        if (this.isNumber(value) || this.isOperator(value)) {
            this.appendToExpression(value);
        } else if (value === '=') {
            this.calculate();
        } else if (value === 'C') {
            this.clear();
        }
    },

    isNumber: function(value) {
        return !isNaN(value);
    },

    isOperator: function(value) {
        return ['+', '-', '*', '/', 'sin(', 'cos(', 'tan(', 'log(', 'sqrt(', '^'].includes(value);
    },

    appendToExpression: function(value) {
        this.expression += value;
        this.updateDisplay(this.expression);
    },

    calculate: function() {
        try {
            const result = eval(this.expression.replace('^', '**'));
            this.updateDisplay(result);
            this.expression = result.toString();
            showToast('계산이 완료되었습니다');
        } catch (e) {
            this.updateDisplay('Error');
            showToast('잘못된 수식입니다');
        }
    },

    clear: function() {
        this.currentInput = '';
        this.operator = null;
        this.previousInput = '';
        this.expression = '';
        this.updateDisplay('');
    },

    updateDisplay: function(value) {
        this.display.value = value;
    }
};

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

scientificCalculator.init();
