const calculator = {
    buttons: [
        ["7", "8", "9", "÷"],
        ["4", "5", "6", "x"],
        ["1", "2", "3", "-"],
        ["0", "C", "=", "+"],
    ],
    container: document.querySelector("div.buttons"),
    display: document.querySelector(".display-value"),
    currentValue: "0",
    storedValue: null,
    selectedOperator: null,
    shouldResetDisplay: false,

    add(a, b) {
        return a + b;
    },

    subtract(a, b) {
        return a - b;
    },

    div(a, b) {
        return Math.round((a / b)*10000)/10000;
    },

    mult(a, b) {
        return a * b;
    },

    operate(a, b, operator) {
        switch (operator) {
            case "÷":
                return this.div(a, b);
            case "x":
                return this.mult(a, b);
            case "-":
                return this.subtract(a, b);
            case "+":
                return this.add(a, b);
        }
    },

    updateDisplay() {
        this.display.textContent = this.currentValue;
    },

    calculate() {
        if (this.storedValue === null || this.selectedOperator === null) return;

        const result = this.operate(
            Number(this.storedValue),
            Number(this.currentValue),
            this.selectedOperator,
        );
        this.currentValue = Number.isFinite(result) ? String(result) : "Error";
        this.storedValue = null;
        this.selectedOperator = null;
    },

    handleButton(button) {
        if (!Number.isNaN(Number(button))) {
            if (this.currentValue === "Error" || this.shouldResetDisplay) {
                this.currentValue = button;
                this.shouldResetDisplay = false;
            } else {
                this.currentValue = this.currentValue === "0"
                    ? button
                    : this.currentValue + button;
            }
        } else if (button === "C") {
            this.currentValue = "0";
            this.storedValue = null;
            this.selectedOperator = null;
            this.shouldResetDisplay = false;
        } else if (button === "=") {
            this.calculate();
            this.shouldResetDisplay = true;
        } else {
            if (
                this.storedValue !== null
                && this.selectedOperator !== null
                && !this.shouldResetDisplay
            ) {
                this.calculate();
            }
            this.storedValue = Number(this.currentValue);
            this.selectedOperator = button;
            this.shouldResetDisplay = true;
        }
        this.updateDisplay();
    },

    renderButtons() {
        for (const row of this.buttons) {
            const buttonRow = document.createElement("div");

            for (const button of row) {
                const buttonElement = document.createElement("button");
                buttonElement.classList.add("btn");
                buttonElement.textContent = button;

                switch (button) {
                    case "C":
                        buttonElement.classList.add("utility");
                        break;
                    case "=":
                        buttonElement.classList.add("equal");
                        break;
                    case "÷":
                    case "x":
                    case "-":
                    case "+":
                        buttonElement.classList.add("op");
                        break;
                    default:
                        buttonElement.classList.add("num");
                }

                buttonElement.addEventListener(
                    "click",
                    () => this.handleButton(button),
                );
                buttonRow.appendChild(buttonElement);
            }

            this.container.appendChild(buttonRow);
        }
    },

    initialize() {
        this.renderButtons();
        this.updateDisplay();
    },
};

calculator.initialize();