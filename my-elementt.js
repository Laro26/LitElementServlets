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
       }
      .titulo{
        font-family: "Lucida Console", "Courier New", monospace;
        font-style: oblique;
        font-size: 70px;
        text-align: center;
        color:#57BED8 ;
        margin-top:10px ;
        margin-bottom:20px;
      }
      .inicio{
        text-align: center;
      }
      .letra{
        font-family: Arial, Helvetica, sans-serif;
        font-style: oblique;
        font-weight: bold;
        font-size: 15px;
      }
      .letra1{
        font-family: Arial, Helvetica, sans-serif;
        font-style: oblique;
        font-weight: bold;
        font-size: 15px;
      }
      button{
        font-family: Arial, Helvetica, sans-serif;
        font-style: oblique;
        font-weight: bold;
        background-color:#86ECEE;
      }
      .tabla{
        font-weight: bold;
        background-color:#C4F1F2;
        color:#0B696B;
        text-align: center;
        font-size: 16px;
      }
      td{
        font-family: Arial, Helvetica, sans-serif;
        font-style: oblique;
        font-size: 14px;
        border: solid 1px gray;
        text-align: center;
      }
      .formulario{
        border: solid 5px #86ECEE;
      }
     `;
  }

  static get properties() {
    return {
      ID: { type: Number },
      data: { type: Array },
      search: { type: Object },
    };
  }

  constructor() {
    super();
    this.ID;
    this.idInformacion = "";
    this.data = [];
    this.numId = "";
    this.typeId = "";
    this.name = "";
    this.lastname = "";
    this.birthDate = "";
    this.gender = "";
    this.adress = "";
    this.phone = "";
    this.occupation = "";
    this.salary = "";
    this.Fem = 0;
    this.Mas = 0;
    this.lista = "";
  }

  render() {
    return html`
     
     <p class="titulo">Censo 2021 Argentina <img width=10% src="./argentina.png"/></p>
     <p class="letra">En el siguente formulario se mostrarar los datos de la busqueda realizada por el documento de identificacion, se selecciona el
     boton "traer informacion" y se visualiza los datos del ciudadano, si se desea modificar, una vez relice los cambios sobre el formulario darle click 
     en el boton "Actualizar", si se desea guardar datos de un nuevo ciudadano se llena el formulario y posteriormente darle click en el boton "Guardar" y por ultimo 
     si se desea eliminar un ciudadano de la lista se dara click en el boton "Eliminar" (verificar que el documento de identodad digitado corresponda a los datos
     visualizados en el formulario). </p>
     <div class="inicio">
     <input value="${this.ID}" @change=${this.getID} placeholder="Numero de identificacion" name="Id">
     <button @click=${this._onClick}>Traer Informacion</button>
     <p class="letra1">Cantidad de mujeres:${this.Fem}</p>
     <p class="letra1">Cantidad de Hombres:${this.Mas}</p>
     </div>
     <div class="formulario">
     <input placeholder="id" name="idInformacion" .value="${this.idInformacion}" @input="${(e) => this.idInformacion = e.target.value}" readonly> 
       <form action="http://localhost:8080/tp5Servlet/todos" method="POST">
       <label  class="letra1">Tipo de documento:</label>
       <input placeholder="Tipo de identificacion" name="TypeId" .value="${this.typeId}"  @input="${(e) => this.typeId = e.target.value}" >
       <label class="letra1">Numero de documento:</label>
       <input placeholder="Numero de identificacion" name="NumId" .value="${this.numId}" @input="${(e) => this.numId = e.target.value}">
       <label class="letra1">Nombres:</label>
       <input placeholder="Nombres" name="Name"  .value="${this.name}"  @input="${(e) => this.name = e.target.value}" >
       <label class="letra1">Apellidos:</label>
       <input placeholder="Apellidos" name="Lastname" .value="${this.lastname}" @input="${(e) => this.lastname = e.target.value}"  >
       <label class="letra1">Fecha de nacimiento:</label>
       <input placeholder="AAAA/MM/DD" name="BirthDate" .value="${this.birthDate}"  @input="${(e) => this.birthDate = e.target.value}" >
       <label class="letra1">Genero:</label>
       <select  name="Gender"  .value="${this.gender}" @input="${(e) => this.gender = e.target.value}">
                            <option value="Masculino" selected>Masculino</option>
                            <option value="Femenino">Femenino</option>
                            </select>
       <label class="letra1">Direccion:</label>                     
       <input placeholder="Direccion" name="Adress"  .value="${this.adress}"  @input="${(e) => this.adress = e.target.value}">
       <label class="letra1">Telefono:</label>
       <input placeholder="Telefono" name="Phone" .value="${this.phone}"  @input="${(e) => this.phone = e.target.value}">
       <label class="letra1"> Ocupacion:</label>
       <select name="Occupation"  .value="${this.occupation}"  @input="${(e) => this.occupation = e.target.value}">
                            <option value="Empleado" selected>Empleado</option>
                            <option value="Independiente">Independiente</option>
                            <option value="Estudiante">Estudiante</option>
                            <option value="Desocupado">Desocupado</option>
                            </select>
       <label class="letra1">Salario:</label>
       <input placeholder="Salario" name="Salary" .value="${this.salary}"  @input="${(e) => this.salary = e.target.value}" >
       <button type="submit">Guardar</button> 
       <button @click=${this._update}>Actualizar</button>
       </form>
       <button @click=${this._delete}>Eliminar</button>
       </div>
     </div>
     <div class="formulario">
     <label class="letra">Seleccione la opcion de visualizacion de la lista de todas las personas censadas:</label>
      <select  name="lista" @change="${this._filtrar}" .value="${this.lista}">
                            <option value="1">De manera ascendente por apellido</option>
                            <option value="2">Por mayoria de edad y desocupados</option>
                            <option value="3">Por debajo de linea de pobreza</option>
                            </select>
<div class="inicio" >                 
<div style="margin-rignt:50px"> 
     <table>
     <tr>

<td class="tabla">Tipo de identificacion</td>
<td class="tabla">Numero de identificacion</td>
<td class="tabla">Nombre</td>
<td class="tabla">Apellido</td>
<td class="tabla">Fecha de Nacimiento</td>
<td class="tabla">Genero</td>
<td class="tabla">Direccion</td>
<td class="tabla">Telefono</td>
<td class="tabla">Ocupacion</td>
<td class="tabla">Salario</td>
    </tr>

    ${this.data.map(item => html`<tr>
     <td> ${item.typeId} </td> 
     <td>${item.numId}</td> 
     <td> ${item.name}  </td>
     <td>${item.lastname} </td>
     <td> ${item.birthDate} </td>
     <td> ${item.gender} </td>
     <td> ${item.adress}  </td>
     <td>${item.phone}  </td>
     <td>${item.occupation}  </td>
     <td>${item.salary}</td></tr>`)}
 </table>
 </div>
 </div>
 </div>
     `;
  }
  getID(e) {
    this.ID = e.target.value;

  }
  _filtrar(e) {
    this.lista = e.target.value;
    console.log(this.lista);

    //console.log(this.typeId);
    fetch("http://localhost:8080/tp5Servlet/todos").then(res => res.json()).then(data => {
      //console.log(data)
      //console.log("hola")
      switch (this.lista) {

        case "1":
          this.data = data.sort(function (a, b) {
            if (a.lastname.toLowerCase() > b.lastname.toLowerCase()) {
              return 1;
            }
            if (a.lastname.toLowerCase() < b.lastname.toLowerCase()) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          break;

        case "2":

          this.data = data.filter(i => (((Date.now() - Date.parse(i.birthDate)) / 31556900000) > 18) && i.occupation == "Desocupado")
          console.log(this.data)

          break;
        case "3":
          this.data = data.filter(i => (i.salary / 1) < 5000)
          break;

        default:
          console.log('Lo lamentamos, por el momento no disponemos de esa opcion.');
          break;
      }
    })
  }
  _delete() {
    console.log(this.idInformacion);
    fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.idInformacion, {
      method: 'DELETE', mode: 'cors', credentials: 'same-origin',
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(() => alert("Se ah eliminado la persona identificado con el No. " + this.idInformacion));
  }
  _onClick() {

    fetch("http://localhost:8080/tp5Servlet/todos").then(res => res.json()).then(data => {
      // console.log(data)
      //this.data = data
      this.search = data.filter(i => i.numId == this.ID)
      //console.log(this.search)
      if (this.search.length != 0) {
        this.idInformacion = this.search[0].idInformacion
        //console.log(this.idInformacion)
        this.numId = this.search[0].numId
        this.typeId = this.search[0].typeId
        this.name = this.search[0].name
        this.lastname = this.search[0].lastname
        this.birthDate = this.search[0].birthDate
        this.gender = this.search[0].gender
        this.adress = this.search[0].adress
        this.phone = this.search[0].phone
        this.occupation = this.search[0].occupation
        this.salary = this.search[0].salary
      } else {
        window.alert("No existe registrado el documento digitado")
      }
      this.Mas = data.filter(item => item.gender == "Masculino").length
      //console.log(this.Mas)
      this.Fem = data.filter(item => item.gender == "Femenino").length
      //console.log(this.Fem)
    })

  }
  _update() {

    // console.log(this.ID);
    console.log(this.idInformacion);
    console.log(this.name);
    console.log(this.lastname);
    fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.idInformacion + "&NumId=" + this.numId + "&TypeId=" + this.typeId + "&Name=" + this.name + "&Lastname=" + this.lastname + "&BirthDate=" + this.birthDate
      + "&Gender=" + this.gender + "&Adress=" + this.adress + "&Phone=" + this.phone + "&Occupation=" + this.occupation + "&Salary=" + this.salary, { method: 'PUT' })
      .then(() => alert("Modificacion exitosa"));
  }

}
window.customElements.define('my-elementt', MyElement);