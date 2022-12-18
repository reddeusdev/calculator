class Calculator {
	constructor() {
		this.outputT = document.querySelector(".calculator__output--top");
		this.outputB = document.querySelector(".calculator__output--bottom");
		this.operator = document.querySelector(".calculator__output--operator");
		this.btr = document.querySelectorAll(".calculator__key");
		this.historia = document.querySelector(".historia__container");
		this.flaga = false;
		this.suma = 0;
		this.historiaTab = [];
		this.btr.forEach((item) =>
			item.addEventListener("click", (e) =>
				this.action(e.target.textContent)
			)
		);
	}

	action(e) {
		if (/^[0-9]/.test(e)) {
			if (
				this.outputB.textContent != 0 ||
				this.outputB.textContent == "0."
			) {
				this.outputB.textContent += e;
			}

			if (
				!(
					this.outputB.textContent != 0 ||
					this.outputB.textContent == "0."
				)
			) {
				this.outputB.textContent = e;
			}

			if (this.flaga) {
				this.outputB.textContent = e;
				this.flaga = false;
			}
		} else {
			switch (e) {
				case ".":
					if (this.outputB.textContent == "") {
						break;
					} else {
						if (!this.outputB.textContent.includes("."))
							this.outputB.textContent += e;
						break;
					}
				case "=":
					this.click(e);
					break;
				case "+":
					this.click(e);
					break;
				case "-":
					this.click(e);
					break;
				case "/":
					this.click(e);
					break;
				case "*":
					this.click(e);
					break;
				case "^2":
					this.click(e);
					break;
				case "^3":
					this.click(e);
					break;
				case "+/-":
					this.click(e);
					break;
				case "C":
					this.resetC();
					break;
				case "CE":
					this.resetCE();
					break;
				case "<":
					this.undo();
					break;
			}
		}
	}

	click(e) {
		if (e != "=") {
			this.outputT.textContent = this.operation(e);
		} else {
			if (this.operator.textContent != "") {
				this.outputT.textContent = this.operation(
					this.operator.textContent
				);
				this.operator.textContent = "";
				this.outputB.textContent = 0;
			}
		}
		this.renderTab();
		this.flaga = true;
	}

	renderTab() {
		this.historia.textContent = "";
		this.historiaTab.forEach((item, id) => {
			const p = document.createElement("p");
			p.textContent = id + 1 + ". " + item;
			this.historia.appendChild(p);
		});
	}

	operation(operator) {
		this.a =
			parseFloat(this.outputT.textContent) + 1
				? parseFloat(this.outputT.textContent)
				: 0;
		this.operator.textContent = operator;
		switch (operator) {
			case "+":
				this.suma = parseFloat(this.outputB.textContent) + this.a;
				this.historiaTab.push(
					this.outputB.textContent +
						this.operator.textContent +
						this.a +
						"=" +
						this.suma
				);
				return this.suma;
			case "-": {
				if (this.outputB.textContent) {
					if (!this.outputT.textContent) {
						this.suma =
							parseFloat(this.outputB.textContent) - this.a;
						this.historiaTab.push(
							this.outputB.textContent +
								this.operator.textContent +
								this.a +
								"=" +
								this.suma
						);
						return this.suma;
					} else {
						this.suma =
							this.a - parseFloat(this.outputB.textContent);
						this.historiaTab.push(
							this.a +
								this.operator.textContent +
								this.outputB.textContent +
								"=" +
								this.suma
						);
						return this.suma;
					}
				} else {
					return 0;
				}
			}
			case "*":
				this.suma = parseFloat(this.outputB.textContent) * this.a;
				this.historiaTab.push(
					this.outputB.textContent +
						this.operator.textContent +
						this.a +
						"=" +
						this.suma
				);
				return this.suma;
			case "/": {
				if (this.outputB.textContent) {
					if (!this.outputT.textContent)
						return (this.suma = parseFloat(
							this.outputB.textContent
						));
					else
						return (this.suma =
							this.a / parseFloat(this.outputB.textContent));
				} else {
					return 0;
				}
			}
			case "^2":
				this.suma = Math.pow(parseFloat(this.outputB.textContent), 2);
				this.historiaTab.push(
					this.outputB.textContent +
						this.operator.textContent +
						"=" +
						this.suma
				);
				return this.suma;
			case "^3":
				this.suma = Math.pow(parseFloat(this.outputB.textContent), 3);
				this.historiaTab.push(
					this.outputB.textContent +
						this.operator.textContent +
						"=" +
						this.suma
				);
				return this.suma;
			case "+/-":
				if (this.outputB.textContent)
					this.outputB.textContent = -parseFloat(
						this.outputB.textContent.slice(
							0,
							this.outputB.textContent.length
						)
					);
				return;
		}
	}

	resetC() {
		this.historiaTab.length = 0;
		this.renderTab();
		this.operator.textContent = "";
		this.outputB.textContent = "";
		this.outputT.textContent = "";
		this.suma = 0;
		this.flaga = false;
	}

	resetCE() {
		this.outputB.textContent = "";
	}

	undo() {
		this.outputB.textContent = this.outputB.textContent.substring(
			0,
			this.outputB.textContent.length - 1
		);
	}
}
new Calculator();
