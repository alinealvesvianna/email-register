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
      formValid: false,
      successMessage: false
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

    this.setState({ successMessage: false });

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
    /* Send the message to Firebase */
    fire.database().ref("messages").push({
      name: this.inputElName.value,
      email: this.inputElEmail.value
    });

    this.setState({
      successMessage: true,
      email: "",
      name: "",
      formValid: false
    });
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <img src={logo} className="logo" alt="Logo Vestô" />
          <p>Descubra uma nova forma de se vestir!</p>
          <p>Cadastre-se e receba novidades Vestô.</p>
          <p className="bold">Consuma consciente, consuma diferente.</p>
        </header>
        {this.state.successMessage && 
            <p className="box-message box-success">Mensagem enviada com
            sucesso!</p>}
        <form className="form" onSubmit={this.addMessage.bind(this)}>
          <FormErrors formErrors={this.state.formErrors} />
          <input
            id="completeName"
            type="text"
            placeholder="Nome Completo"
            ref={el => (this.inputElName = el)}
            value={this.state.name}
            onChange={event => this.handleUserInput(event)}
            name="name"
            className="input"
          />
          <input
            id="completeEmail"
            type="text"
            placeholder="Email"
            ref={el => (this.inputElEmail = el)}
            value={this.state.email}
            onChange={event => this.handleUserInput(event)}
            name="email"
            className="input"
          />
          <button
            className="submit-button"
            disabled={!this.state.formValid}
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

export default App;
