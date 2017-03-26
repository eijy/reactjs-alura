import React, { Component } from 'react';

import $ from 'jquery';
import InputCustomizado from './InputCustomizado';
import ButtonSubmit from './ButtonSubmit';

class FormularioAutor extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }
  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url:"http://cdc-react.herokuapp.com/api/autores",
      contentType: 'application/json',
      dataType: 'json',
      type:'post',
      data:JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
      success: function(response) {
        this.props.callbackAtualizaListagem(response);
      }.bind(this),
      error: function(response) {
        console.log('erro');
      }
    });
  }

  setNome(evento) {
    this.setState({nome: evento.target.value})
  }
  setEmail(evento) {
    this.setState({email: evento.target.value})
  }
  setSenha(evento) {
    this.setState({senha: evento.target.value})
  }

  render() {
    return(
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />

          <ButtonSubmit label="Gravar" />

        </form>

      </div>
    );
  }
}

class FormularioTabela extends Component {
  constructor() {
    super();
    this.state = {
      lista: []
    };
  }

  render() {
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lista.map(function(autor) {
                return (
                  <tr key={autor.id}>
                    <td> {autor.nome} </td>
                    <td> {autor.email}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default class AutorBox extends Component {
  constructor() {
    super();
    this.state = {
      lista: []
    };
    this.atualizaListagem = this.atualizaListagem.bind(this);
  }

  atualizaListagem(novaLista) {
    this.setState({lista: novaLista});
  }
  componentDidMount() {
    $.ajax({
      url:"http://cdc-react.herokuapp.com/api/autores",
      dataType: 'json',
      success: function(response) {
        this.setState({lista: response})
      }.bind(this)
    });
  }
  render() {
    return(
      <div>
        <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
        <FormularioTabela lista={this.state.lista}/>
      </div>
    );
  }
}
