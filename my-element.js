/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      ID: { type: Number },
      data: { type: Array },
      TypeId : {type: String},
      NumId : {type: String},
      Name : {type: String},
      apellido : {type: String},
      fechaNacimiento : {type: String},
      sexo : {type: String},
      direccion : {type: String},
      telefono : {type: String},
      ocupacion : {type: String},
      ingreso : {type: String},
      search:{type: Object},
    };
  }

  constructor() {
    super();
    this.ID;
    this.data = [];
    this.numId="";
    this.typeId="";
    this.name="";
  }

  render() {
    return html`
    <div>
    <h1>Agrega un Ciudadano al Censo 2021 Argentina</h1>
      <form action="http://localhost:8080/tp5Servlet/todos" method="POST">
      <input placeholder="Numero de identificacion" name="NumId" .value="${this.numId}" @input="${(e) => this.numId = e.target.value}">
      <input placeholder="Tipo de identificacion" name="TypeId" .value="${this.typeId}" @input="${(e) => this.typeId = e.target.value}">
      <input placeholder="Nombres" name="Name"  .value="${this.name}" >
      <input placeholder="Apellidos" name="Lastname" >
      <input placeholder="Fecha de nacimiento" name="BirthDarte" >
      <input placeholder="Genero" name="Gender" >
      <input placeholder="Direccion" name="Adress">
      <input placeholder="Telefono" name="Phone" >
      <input placeholder="Ocupacion" name="Occupation">
      <input placeholder="Salario" name="Salary" >
      <button type="submit">Guardar</button>
      </form>
      <button @click=${this._update}>Actualizar</button>

      
    </div>
    <div>
    <h1>Mostrar la informacion de los ciudadanos</h1>
    
 
    <table >
    <tr>

<td>id</td>
<td>Tipo de identificacion</td>
<td>Numero de identificacion</td>

<td>Nombre</td>

<td>Apellido</td>

    </tr>
    <td>${this.data.map(item => html`<tr>${item.idInformacion} ${item.typeId}  ${item.numId}  ${item.name}   ${item.lastname}  ${item.birthDate}  ${item.gender}  
    ${item.adress}  ${item.phone}  ${item.occupation}  ${item.salary}
    
    </tr>`)}</td>
</table>
    <button @click=${this._onClick}>Traer Informacion</button>
    </div>

    <input value="${this.ID}" @change=${this.getID} @input= "${e=> this.ID= e.target.value}" placeholder="id de la persona" name="Id">
      
      <button @click=${this._delete}>Borrar</button>
    `;
  }
  getID(e) {
    this.ID = e.target.value;
 
  }
  _delete() {
    console.log(this.ID);
    fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.ID, {
      method: 'DELETE', mode: 'cors', credentials: 'same-origin',
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(() => alert("Se ah eliminado la persona con el id" + this.ID));
  }
  _onClick() {

    fetch("http://localhost:8080/tp5Servlet/todos").then(res => res.json()).then(data => {
      console.log(data), 
      this.data = data
      this.search= this.data.filter(i =>i.idInformacion==this.ID)
      this.numId=this.search[0].numId
      console.log(this.search)
      console.log(this.numId)
    })

  }
  _update() {
    
    let bodyJson= {
      'TypeId': this.typeId,
      'NumId': this.numId,
      'Name' : this.name,
      
  };
  console.log(bodyJson);
    console.log(this.ID);
    fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.ID +"&NumId="+this.numId,{ method: 'PUT' ,body: bodyJson})
    .then(() => alert("Insercción exitosa"));
  }
  
}
window.customElements.define('my-element', MyElement);
