class User {
  #id;
  #email;
  #password;
  #role;
  #createdAt;
  #updatedAt;

  constructor({id, email, password, role}) {
    this.#id = id;
    this.#email = email;
    this.#password = password;
    this.#role = role;
    this.#createdAt = new Date();
    this.#updatedAt = this.#createdAt;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get role() {
    return this.#role;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  // Setters

  set email(value) {
    this.#email = value;
    this.#updateTimestamp();
  }

  set password(value) {
    this.#password = value;
    this.#updateTimestamp();
  }

  set role(value) {
    this.#role = value;
    this.#updateTimestamp();
  }

  #updateTimestamp() {
    this.#updatedAt = new Date();
  }
}

export default User;
