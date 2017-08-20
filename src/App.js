import React, { Component } from "react";
import fire from "./fire";
import { FormErrors } from "./FormErrors";
import logo from "./logo-vesto.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      email: "",
      name: "",
      formErrors: { email: "", name: "" },
      emailValid: false,
      nameValid: false,
      formValid: false
    };
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " é inválido";
        break;
      case "name":
        nameValid = value.length > 2;
        fieldValidationErrors.name = nameValid ? "" : " é muito curto";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        nameValid: nameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.nameValid
    });
  }

  addMessage(e) {
    e.preventDefault();
    this.inputElEmail.value;

    /* Send the message to Firebase */
    fire.database().ref("messages").push({
      name: this.inputElName.value,
      email: this.inputElEmail.value
    });
    this.inputElName.value = "";
    this.inputElEmail.value = "";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Logo Vestô" />
        </header>
        <p>Descubra uma nova forma de se vestir! </p>
        <p>Cadastre-se e receba novidades Vestô.</p>
        <p>Consuma consciente, consuma diferente.</p>
        <form onSubmit={this.addMessage.bind(this)}>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <label htmlFor="completeName">Nome Completo</label>
          <input
            id="completeName"
            type="text"
            placeholder="Nome Completo"
            ref={el => (this.inputElName = el)}
            value={this.state.name}
            onChange={event => this.handleUserInput(event)}
            name="name"
          />
          <label htmlFor="completeEmail">Email</label>
          <input
            id="completeEmail"
            type="text"
            placeholder="Email"
            ref={el => (this.inputElEmail = el)}
            value={this.state.email}
            onChange={event => this.handleUserInput(event)}
            name="email"
          />
          <input disabled={!this.state.formValid} type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
