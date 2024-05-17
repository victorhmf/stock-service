class Stock {
  #id;
  #name;
  #symbol;
  #open;
  #high;
  #low;
  #close;
  #createdAt;
  #updatedAt;
  #userId;

  constructor({ id, name, symbol, open, high, low, close, userId }) {
    this.#id = id;
    this.#name = name;
    this.#symbol = symbol;
    this.#open = open;
    this.#high = high;
    this.#low = low;
    this.#close = close;
    this.#userId = userId;
    this.#createdAt = new Date();
    this.#updatedAt = this.#createdAt;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get symbol() {
    return this.#symbol;
  }

  get open() {
    return this.#open;
  }

  get high() {
    return this.#high;
  }

  get low() {
    return this.#low;
  }

  get close() {
    return this.#close;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  get userId() {
    return this.#userId;
  }

  // Setters
  set name(value) {
    this.#name = value;
    this.#updateTimestamp();
  }

  set symbol(value) {
    this.#symbol = value;
    this.#updateTimestamp();
  }

  set open(value) {
    this.#open = value;
    this.#updateTimestamp();
  }

  set high(value) {
    this.#high = value;
    this.#updateTimestamp();
  }

  set low(value) {
    this.#low = value;
    this.#updateTimestamp();
  }

  set close(value) {
    this.#close = value;
    this.#updateTimestamp();
  }

  #updateTimestamp() {
    this.#updatedAt = new Date();
  }
}

export default Stock;
